import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calculate, parseAmount } from '../src/calculator.ts'
test('financial vectors', () => {
  assert.deepEqual(calculate(true,'300000','80000','25000'),{received:300000,serviceFee:80000,passThrough:220000,cost:25000,surplus:55000})
  assert.equal(calculate(true,'300000','300000','0').surplus,300000)
  assert.equal(calculate(false,'100000','0','25000').surplus,75000)
  assert.equal(calculate(true,'100000','120000','0'),null)
  assert.equal(calculate(true,'50000','10000','80000').surplus,-70000)
})
test('digits, zero, invalid and limit', () => {
  assert.equal(parseAmount('۳۰۰٬۰۰۰'),300000); assert.equal(parseAmount('١٢٣'),123); assert.equal(parseAmount('۰'),0)
  for(const n of ['', '-1', '1.5', '10000001']) assert.equal(parseAmount(n),null)
})
