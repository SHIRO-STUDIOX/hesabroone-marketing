import { test } from 'node:test';
import assert from 'node:assert/strict';
import {calculate, parseAmount} from '../calculator.js';
test('five documented calculation cases', () => {
  assert.deepEqual(calculate({agency:true,total:'300000',fee:'80000',expense:'25000'}),{received:300000,serviceFee:80000,passThrough:220000,relatedExpenses:25000,illustrativeSurplus:55000});
  assert.equal(calculate({agency:true,total:'300000',fee:'300000',expense:'0'}).illustrativeSurplus,300000);
  assert.equal(calculate({agency:false,total:'100000',expense:'25000'}).illustrativeSurplus,75000);
  assert.equal(calculate({agency:true,total:'100000',fee:'120000',expense:'0'}),null);
  assert.equal(calculate({agency:true,total:'50000',fee:'10000',expense:'80000'}).illustrativeSurplus,-70000);
});
test('local digits, empty, zero, invalid and limit', () => {
  assert.equal(parseAmount('۳۰۰٬۰۰۰'),300000); assert.equal(parseAmount('١٢٣'),123);
  for (const bad of ['', '-1','1.5','foo','10000001']) assert.equal(parseAmount(bad),null);
  assert.equal(parseAmount('۰'),0);
});
