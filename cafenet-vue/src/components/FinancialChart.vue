<script setup lang="ts">
import { computed, ref } from 'vue'
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer } from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { format } from '@/calculator'

const props = defineProps<{ agency: boolean, received: number, fee: number, passThrough: number, expense: number }>()
const emit = defineEmits<{ changeExpense: [value: number] }>()
const mode = ref('split')
const config = {
  fee: { label: 'حق‌الزحمه', color: 'var(--chart-1)' },
  other: { label: 'مبلغ مقایسه', color: 'var(--chart-2)' },
} satisfies ChartConfig
type Point = { index: number, fee: number, other: number }
const data = computed<Point[]>(() => [{ index: 1, fee: props.fee, other: mode.value === 'split' ? props.passThrough : props.expense }])
const labels = computed(() => mode.value === 'split' ? ['حق‌الزحمه خدمت', 'وجه عبوری فرضی'] : ['حق‌الزحمه خدمت', 'هزینه انتخاب‌شده'])
const maxExpense = computed(() => Math.min(10000000, Math.max(100000, props.received * 2, props.expense)))
function sliderChanged(value: number[] | undefined) {
  if (value?.[0] !== undefined) emit('changeExpense', value[0])
}
function selectMode(value: unknown) {
  if (value === 'split' || value === 'cost') mode.value = value
}
</script>

<template>
  <Card class="mt-6">
    <CardHeader>
      <CardTitle>عددها رو با هم ببین</CardTitle>
      <CardDescription>مثال فرضی · مبلغ به تومان · مقایسه در همین خدمت</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-5">
      <ToggleGroup :model-value="mode" type="single" variant="outline" :spacing="2" aria-label="نوع نمودار" @update:model-value="selectMode">
        <ToggleGroupItem value="split">تفکیک دریافتی</ToggleGroupItem>
        <ToggleGroupItem value="cost">حق‌الزحمه و هزینه</ToggleGroupItem>
      </ToggleGroup>
      <p class="text-sm text-muted-foreground">{{ mode === 'split' ? 'اجزای دریافتی فرضی را مقایسه کن؛ وجه عبوری درآمد یا هزینه خدمت نیست.' : 'حق‌الزحمه و هزینه انتخاب‌شده مربوط به همین مثال‌اند.' }}</p>
      <div v-if="data[0] && (data[0].fee || data[0].other)" dir="ltr" aria-hidden="true">
        <ChartContainer :config="config" class="h-44 w-full">
          <VisXYContainer :data="data" :y-domain="[0, Math.max(data[0].fee, data[0].other) * 1.15]">
            <VisGroupedBar :x="(d: Point) => d.index" :y="[(d: Point) => d.fee, (d: Point) => d.other]" :color="['var(--chart-1)', 'var(--chart-2)']" :rounded-corners="5" />
            <VisAxis type="y" :tick-line="false" :domain-line="false" :grid-line="true" :tick-format="(n: number) => format(n)" />
          </VisXYContainer>
        </ChartContainer>
      </div>
      <p v-else class="text-sm text-muted-foreground">هر دو مقدار این نمودار صفر هستند.</p>
      <dl class="flex flex-col gap-2 text-sm" aria-label="مقادیر نمودار">
        <div class="flex justify-between gap-4"><dt class="flex items-center gap-2"><span aria-hidden="true" class="size-3 rounded-sm bg-chart-1" />{{ labels[0] }}</dt><dd>{{ format(fee) }} تومان</dd></div>
        <div class="flex justify-between gap-4"><dt class="flex items-center gap-2"><span aria-hidden="true" class="size-3 rounded-sm bg-chart-2" />{{ labels[1] }}</dt><dd>{{ format(mode === 'split' ? passThrough : expense) }} تومان</dd></div>
      </dl>
      <Field v-if="mode === 'cost'">
        <FieldLabel for="expense-experiment">هزینه همین مثال را تغییر بده: {{ format(expense) }} تومان</FieldLabel>
        <Slider id="expense-experiment" :model-value="[expense]" :min="0" :max="maxExpense" :step="1000" aria-label="تغییر هزینه همین مثال به تومان" @update:model-value="sliderChanged" />
        <FieldDescription>نمودار و مازاد با تغییر هزینه به‌روز می‌شوند. برای وارد کردن مبلغ دقیق به مرحله قبل برگرد.</FieldDescription>
      </Field>
    </CardContent>
    <CardFooter>این نمودار آموزشی است و گزارش حسابداری یا سود قطعی نیست.</CardFooter>
  </Card>
</template>
