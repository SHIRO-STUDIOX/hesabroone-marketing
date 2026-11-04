import {calculate, parseAmount, format} from './calculator.js';

const app = document.querySelector('#app');
const KEY = 'hesabro-cafenet-demo-v1', TTL = 24 * 60 * 60 * 1000;
const services = [['print','پرینت','▤'],['scan','اسکن','▧'],['online','ثبت‌نام اینترنتی','⌘'],['typing','تایپ','✎'],['agency','پرداخت به نمایندگی','↗']];
const defaults = () => ({version:1, step:0, visited:0, services:['print','online'], total:'100000', fee:'100000', expenseEnabled:false, expense:'25000', updated:Date.now()});
let notice = '';
function restore() {
  try {
    const raw = localStorage.getItem(KEY); if (!raw) return defaults();
    const s = JSON.parse(raw);
    if (s.version !== 1 || !Number.isFinite(s.updated) || Date.now()-s.updated > TTL || !Array.isArray(s.services) || !s.services.every(x=>services.some(v=>v[0]===x)) || !Number.isInteger(s.step) || s.step<0 || s.step>6 || !Number.isInteger(s.visited) || s.visited < s.step || s.visited>6 || !['total','fee','expense'].every(k=>typeof s[k]==='string' && s[k].length<30) || typeof s.expenseEnabled !== 'boolean') {
      localStorage.removeItem(KEY); notice='نسخه یا زمان تجربه قبلی به پایان رسیده؛ یک مثال تازه شروع شد.'; return defaults();
    }
    return s;
  } catch { notice='بازیابی تجربه قبلی ممکن نبود؛ یک مثال تازه شروع شد.'; return defaults(); }
}
let state = restore();
let storageWarning = false;
const agency = () => state.services.includes('agency');
const result = () => calculate({agency:agency(), total:state.total, fee:state.fee, expense:state.expenseEnabled ? state.expense : '0'});
function save() { state.updated=Date.now(); try {localStorage.setItem(KEY, JSON.stringify(state));} catch {storageWarning=true;} }
const text = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => `${format(n)} <small>تومان</small>`;
const badge = '<span class="sample-badge"><span aria-hidden="true">✳</span> مثال فرضی</span>';
const icon = (name) => ({arrow:'←', back:'→', spark:'✳', receipt:'▤', check:'✓'}[name]);
function amountField(key,label,hint) {
  return `<label class="field"><span class="field-label">${label}</span><span class="input-wrap"><input data-field="${key}" type="text" inputmode="numeric" autocomplete="off" value="${text(state[key])}" aria-describedby="${key}-hint ${key}-error"><span>تومان</span></span><span class="field-hint" id="${key}-hint">${hint}</span><span class="error" id="${key}-error" role="status"></span></label>`;
}
function validStep() {
  if (state.step===1) return state.services.length>0;
  if (state.step===3) return parseAmount(state.total)!==null && (!agency() || (parseAmount(state.fee)!==null && parseAmount(state.fee)<=parseAmount(state.total)));
  if (state.step===4) return !state.expenseEnabled || parseAmount(state.expense)!==null;
  return true;
}
function screen() {
  const total=parseAmount(state.total), fee=agency()?parseAmount(state.fee):total, r=result();
  switch(state.step) {
    case 0: return `<div class="hero"><div class="eyebrow"><span class="eyebrow-dot"></span> یک تجربه کوتاه برای کافی‌نت‌ها</div><h1 id="story-title" tabindex="-1">همه پولی که می‌گیری،<br><em>درآمد خودته؟</em></h1><p class="lead">بیا با هم یک دریافت نمونه رو بررسی کنیم و ببینیم چه چیزی ازش برای کسب‌وکارت می‌مونه.</p><div class="hero-art" aria-hidden="true"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="receipt hero-receipt"><div class="receipt-top"><span>رسید خدمات</span><span>✳</span></div><div class="receipt-rule"></div><div class="receipt-row"><span>دریافتی مشتری</span><b>••••••</b></div><div class="receipt-row"><span>حق‌الزحمه شما</span><b>••••</b></div><div class="receipt-rule dashed"></div><div class="receipt-bottom"><span>یک نگاه تازه به دخل‌وخرج</span><b>✓</b></div></div><div class="floating-mark">↗</div></div><p class="trust"><span>✓</span> بدون نیاز به شماره موبایل <i></i> حدود چند قدم ساده</p></div>`;
    case 1: return `<div class="content"><div class="eyebrow">اول از همه، کار تو</div><h1 id="story-title" tabindex="-1">امروز چه کارهایی<br><em>انجام دادی؟</em></h1><p class="lead">یک یا چند خدمت رو انتخاب کن تا مثال رو با هم مرور کنیم.</p><div class="choices" role="group" aria-label="انتخاب خدمات">${services.map(([id,label,symbol])=>`<button class="choice ${state.services.includes(id)?'selected':''}" data-service="${id}" aria-pressed="${state.services.includes(id)}"><span class="choice-icon" aria-hidden="true">${symbol}</span><span>${label}</span><span class="choice-check" aria-hidden="true">${state.services.includes(id)?'✓':'+'}</span></button>`).join('')}</div><p class="helper">انتخاب‌هات رو هر وقت بخوای می‌تونی تغییر بدی.</p></div>`;
    case 2: return `<div class="content">${badge}<div class="eyebrow">یک لحظه از روز کاری</div><h1 id="story-title" tabindex="-1">یک مشتری پرداخت کرد.<br><em>بیایم رسیدش رو ببینیم.</em></h1><p class="lead">${agency()?'در این مثال فرض می‌کنیم بخشی از مبلغ به نمایندگی برای طرف دیگری دریافت شده.':'در این مثال ساده، همه دریافتی را مبلغ خدمت در نظر می‌گیریم.'}</p><div class="receipt full-receipt"><div class="receipt-top"><span>رسید خدمات کافی‌نت</span><span>✳</span></div><div class="receipt-rule"></div><div class="receipt-row"><span>نوع مثال</span><b>${agency()?'پرداخت به نمایندگی':'خدمت معمولی'}</b></div><div class="receipt-row"><span>دریافتی مشتری</span><b>${total===null?'—':money(total)}</b></div><div class="receipt-rule dashed"></div><div class="receipt-bottom"><span>وضعیت رسید</span><b>نمونه آموزشی</b></div></div><div class="note"><span>✳</span><p>این یک مثال ساختگی است؛ هیچ سند یا تراکنشی ثبت نمی‌شود.</p></div></div>`;
    case 3: return `<div class="content">${badge}<div class="eyebrow">حالا خودت امتحان کن</div><h1 id="story-title" tabindex="-1">${agency()?'چقدرش حق‌الزحمه':'دریافتی این خدمت'}<br><em>${agency()?'خودته؟':'چقدر بود؟'}</em></h1><p class="lead">${agency()?'عددها رو تغییر بده تا تفکیک این دریافت فرضی رو ببینی.':'برای این خدمت فرضی، کل دریافتی را مبلغ خدمت در نظر می‌گیریم.'}</p><div class="form-stack">${amountField('total','کل دریافتی از مشتری','عدد صحیح از صفر تا ۱۰٬۰۰۰٬۰۰۰ تومان')}${agency()?amountField('fee','حق‌الزحمه خدمت','نباید از کل دریافتی بیشتر باشد.'):''}</div><div class="live-card"><span>${agency()?'وجه عبوری فرضی':'حق‌الزحمه فرضی'}</span><strong id="live-amount">${total!==null && fee!==null && fee<=total?money(agency()?total-fee:total):'—'}</strong><small>${agency()?'با فرض دریافت به نمایندگی برای طرف ثالث':'در این مثال وجه عبوری وجود ندارد'}</small></div></div>`;
    case 4: return `<div class="content">${badge}<div class="eyebrow">یک قدم تا گزارش</div><h1 id="story-title" tabindex="-1">هزینه‌های انجام کار<br><em>چقدر شد؟</em></h1><p class="lead">فقط هزینه مرتبط با همین خدمت نمونه رو در نظر بگیر؛ اضافه کردن هزینه اختیاریه.</p><button class="expense-option ${state.expenseEnabled?'selected':''}" data-action="toggle-expense" aria-pressed="${state.expenseEnabled}"><span class="choice-icon">◫</span><span><b>${agency()?'اینترنت یا اپراتور':'کاغذ و تونر'}</b><small>هزینه نمونه مرتبط با همین خدمت</small></span><span class="choice-check">${state.expenseEnabled?'✓':'+'}</span></button>${state.expenseEnabled?`<div class="expense-field">${amountField('expense','مبلغ هزینه نمونه','عدد صحیح از صفر تا ۱۰٬۰۰۰٬۰۰۰ تومان')}</div>`:'<p class="helper">اگر هزینه‌ای اضافه نکنی، در گزارش صفر در نظر گرفته می‌شود.</p>'}<div class="note"><span>✳</span><p>هزینه ماهانه بدون مبنای تخصیص به این خدمت اضافه نمی‌شود.</p></div></div>`;
    case 5: if(!r) return `<div class="content"><h1 id="story-title" tabindex="-1">اطلاعات مثال کامل نیست</h1><p>به مرحله قبل برگرد و مبلغ‌ها رو بررسی کن.</p></div>`; return `<div class="content result-content">${badge}<div class="eyebrow">تصویر روشن‌تر</div><h1 id="story-title" tabindex="-1">${agency()?'دریافتی با درآمد':'درآمد و هزینه رو'}<br><em>${agency()?'یکی نیست.':'جدا ببین.'}</em></h1><p class="lead">این نتیجه فقط بر اساس عددهای همین مثال آموزشی است.</p><div class="result-hero"><span>مازاد پس از هزینه‌های واردشده</span><strong>${money(r.illustrativeSurplus)}</strong><small>${r.illustrativeSurplus<0?'مازاد منفی است؛ هزینه‌های انتخابی از حق‌الزحمه بیشترند.':'بر اساس هزینه‌های انتخابی، نه سود خالص قطعی'}</small></div><div class="breakdown"><div><span>دریافتی مشتری</span><b>${money(r.received)}</b></div><div><span>حق‌الزحمه خدمت</span><b>${money(r.serviceFee)}</b></div>${agency()?`<div><span>وجه عبوری فرضی</span><b>${money(r.passThrough)}</b></div>`:''}<div><span>هزینه‌های انتخابی</span><b>${money(r.relatedExpenses)}</b></div></div>${agency()&&r.received>0?`<div class="split-bar" aria-label="از دریافتی، ${format(r.serviceFee)} تومان حق‌الزحمه و ${format(r.passThrough)} تومان وجه عبوری فرضی است"><span style="width:${Math.max(0,Math.min(100,r.serviceFee/r.received*100))}%"></span></div><div class="legend"><span>● حق‌الزحمه</span><span>● وجه عبوری</span></div>`:''}<details><summary>این عدد چطور حساب شد؟</summary><p>حق‌الزحمه منهای هزینه‌های واردشده = مازاد آموزشی. ${agency()?'وجه عبوری با فرض رابطه نمایندگی برابر دریافتی منهای حق‌الزحمه است.':''} این مثال گزارش حسابداری یا محاسبه مالیات نیست.</p></details><div class="bridge"><span class="bridge-icon">✳</span><div><b>حسابرو چطور کمک می‌کنه؟</b><p>حسابرو امکان ثبت درآمد و هزینه، دریافت و پرداخت و مشاهده گردش حساب را دارد. تفکیک وجه عبوری در اینجا فقط یک سناریوی آموزشی است.</p></div></div></div>`;
    case 6: return `<div class="content activation"> <div class="activation-symbol">✳</div><div class="eyebrow">این تازه شروع راهه</div><h1 id="story-title" tabindex="-1">حالا نوبت<br><em>کافی‌نت خودته.</em></h1><p class="lead">با اطلاعات واقعی کسب‌وکارت ادامه بده و ثبت‌های خودت رو در یک دفتر منظم نگه دار.</p><div class="activation-card"><div><span>۱</span><p>ورود و تأیید شماره موبایل</p></div><div><span>۲</span><p>انتخاب یا ساخت دفتر کسب‌وکار</p></div><div><span>۳</span><p>ثبت اولین عملیات مالی واقعی</p></div></div><div class="note"><span>✳</span><p>داده‌های این مثال به دفتر واقعی منتقل نمی‌شوند.</p></div><div id="activation-message" class="activation-message" role="status" hidden>اتصال به حسابرو هنوز برای این نمونه آماده نیست. هیچ حساب یا دفتری ساخته نشده است.</div></div>`;
  }
}
const labels=['شروع تجربه','بریم سراغ دریافت','دریافت رو بررسی کن','ادامه','گزارش رو ببین','ادامه در حسابرو','ساخت دفتر واقعی'];
function render(focus=false) {
 const step=state.step;
 app.innerHTML=`<main class="stage"><div class="desktop-note"><div class="brand-mark">✳</div><span>حسابرو وان</span><p>برای حساب‌وکتاب<br>روشن‌ترِ کسب‌وکار</p><div class="side-line"></div><small>یک تجربه تعاملی برای کافی‌نت‌ها</small></div><section class="story-shell" aria-label="تجربه تعاملی کافی‌نت"><header class="header"><div class="progress gesture-zone" role="progressbar" aria-label="پیشرفت تجربه؛ برای جابه‌جایی می‌توانید در این ناحیه بکشید یا از دکمه‌ها استفاده کنید" aria-valuemin="1" aria-valuemax="7" aria-valuenow="${step+1}">${Array.from({length:7},(_,i)=>`<span class="${i<=step?'active':''}"></span>`).join('')}</div><div class="topline"><div class="brand"><span class="brand-mark">✳</span><b>حسابرو <small>وان</small></b></div><div class="header-actions"><span class="step-count">${format(step+1)} / ${format(7)}</span><button class="reset" data-action="reset" aria-label="شروع دوباره و حذف داده نمونه" title="شروع دوباره">↻</button></div></div></header><div class="story-scroll" id="story-scroll">${notice?`<div class="notice" role="status">${text(notice)}</div>`:''}${storageWarning?'<div class="notice" role="status">ذخیره روی این دستگاه در دسترس نیست؛ با بستن صفحه اطلاعات نمونه پاک می‌شود.</div>':''}${screen()}</div><footer class="footer">${step>0?`<button class="back-button" data-action="back" aria-label="مرحله قبل">${icon('back')}</button>`:''}<button class="primary" data-action="next" ${validStep()?'':'disabled'}><span>${labels[step]}</span><span aria-hidden="true">${icon('arrow')}</span></button><p class="footer-caption">${step===1 && !validStep()?'حداقل یک خدمت انتخاب کن.':step===0?'یک مثال آموزشی، بدون ثبت اطلاعات واقعی':'اطلاعات این تجربه فقط روی همین دستگاه می‌ماند'}</p></footer></section><div class="desktop-index"><span>CAFE / 01</span><div></div><span>تجربه صنفی حسابرو</span></div></main>`;
 if(focus) document.querySelector('#story-title')?.focus({preventScroll:true});
 updateValidation();
}
function updateValidation(){
  const total=parseAmount(state.total), fee=parseAmount(state.fee), cost=parseAmount(state.expense);
  const errors={total:total===null?'یک مبلغ صحیح بین صفر تا ۱۰٬۰۰۰٬۰۰۰ تومان وارد کن.':'', fee:fee===null?'یک مبلغ صحیح وارد کن.':total!==null && fee>total?'حق‌الزحمه نمی‌تونه از کل دریافتی بیشتر باشه.':'', expense:cost===null?'یک مبلغ صحیح بین صفر تا ۱۰٬۰۰۰٬۰۰۰ تومان وارد کن.':''};
  for(const [key,msg] of Object.entries(errors)){const el=document.getElementById(`${key}-error`), input=document.querySelector(`[data-field="${key}"]`); if(el)el.textContent=msg; if(input) input.setAttribute('aria-invalid',String(Boolean(msg)));}
  const button=document.querySelector('[data-action="next"]'); if(button) button.disabled=!validStep();
  const live=document.getElementById('live-amount'); if(live) live.innerHTML=total!==null && (!agency() || (fee!==null&&fee<=total)) ? money(agency()?total-fee:total) : '—';
}
function go(step, push=true){ if(step<0||step>6) return; state.step=step;state.visited=Math.max(state.visited,step);notice=''; save(); if(push) history.pushState({step},'');render(true); }
history.replaceState({step:state.step},'');
window.addEventListener('popstate', e=>{const step=e.state?.step; if(Number.isInteger(step)&&step>=0&&step<=state.visited)go(step,false);else go(0,false);});
app.addEventListener('click', e=>{
 const service=e.target.closest('[data-service]');
 if(service){const id=service.dataset.service, before=agency(), selected=state.services.includes(id), after=id==='agency'?!selected:before; if(before!==after && !confirm('با تغییر نوع مثال، مبلغ‌ها و هزینه نمونه به مقدار اولیه برمی‌گردند. ادامه می‌دهی؟'))return; state.services=selected?state.services.filter(s=>s!==id):[...state.services,id]; if(before!==after){state.total=after?'300000':'100000';state.fee=after?'80000':'100000';state.expense='25000';state.expenseEnabled=false;notice='نوع مثال تغییر کرد و مبلغ‌های وابسته به مقدار اولیه برگشتند.';} save();render();return;}
 const action=e.target.closest('[data-action]')?.dataset.action;
 if(action==='back')go(state.step-1);
 if(action==='next' && validStep()){if(state.step===6){document.getElementById('activation-message').hidden=false;}else go(state.step+1);}
 if(action==='toggle-expense'){state.expenseEnabled=!state.expenseEnabled;save();render();}
 if(action==='reset' && confirm('تجربه از ابتدا شروع و داده‌های نمونه این دستگاه حذف شود؟')){state=defaults();notice='داده نمونه پاک شد و تجربه از ابتدا شروع شد.';save();history.replaceState({step:0},'');render(true);}
});
app.addEventListener('input', e=>{const key=e.target.dataset.field;if(!key)return;state[key]=e.target.value;save();updateValidation();});
let touchStart=null;
app.addEventListener('touchstart', e=>{if(e.touches.length!==1 || !e.target.closest('.gesture-zone'))return;touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
app.addEventListener('touchend', e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)<70||Math.abs(dx)<Math.abs(dy)*1.5)return;if(dx<0&&validStep()&&state.step<6)go(state.step+1);else if(dx>0&&state.step>0)go(state.step-1);},{passive:true});
render();
