'use strict'

const test = require('brittle')
const { getCanadaProvince } = require('..')

test('getCanadaProvince - should fail on unsupported format', (t) => {
  t.exception(() => getCanadaProvince('Ont', 'alpha3'), /ERR_CODE_FORMAT_NOT_SUPPORTED/)
})

test('getCanadaProvince - should return null in case if input is not string', (t) => {
  t.is(getCanadaProvince(35), null)
})

test('getCanadaProvince - should return null when state is not found', (t) => {
  t.is(getCanadaProvince('Atlantic'), null)
})

test('getCanadaProvince - should find province by name', (t) => {
  t.is(getCanadaProvince('Ontario'), 'ON')
})

test('getCanadaProvince - should find province by english abbreviation', (t) => {
  t.is(getCanadaProvince('PEI'), 'PE')
})

test('getCanadaProvince - should find province by french abbreviation', (t) => {
  t.is(getCanadaProvince('ÎPÉ'), 'PE')
})

test('getCanadaProvince - should find province by international alpha code', (t) => {
  t.is(getCanadaProvince('ON'), 'ON')
})

test('getCanadaProvince - should find province by standard geographical classification code', (t) => {
  t.is(getCanadaProvince('35'), 'ON')
})

test('getCanadaProvince - should support name format', (t) => {
  t.is(getCanadaProvince('35', 'name'), 'ONTARIO')
})

test('getCanadaProvince - should support english abbreviation format', (t) => {
  t.is(getCanadaProvince('11', 'en_abbr'), 'PEI')
})

test('getCanadaProvince - should support french abbreviation format', (t) => {
  t.is(getCanadaProvince('11', 'fr_abbr'), 'ÎPÉ')
})

test('getCanadaProvince - should support french name', (t) => {
  t.is(getCanadaProvince('NS', 'fr_name'), 'NOUVELLE-ÉCOSSE')
})

test('getCanadaProvince - should support international alpha code format', (t) => {
  t.is(getCanadaProvince('Ontario', 'int_alpha_code'), 'ON')
})

test('getCanadaProvince - should support standard geographical classification code format', (t) => {
  t.is(getCanadaProvince('ONT', 'std_geo_code'), '35')
})
