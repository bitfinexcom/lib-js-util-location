'use strict'

const test = require('brittle')
const { getCountryCode } = require('..')
const { isEeaCountry } = require('../src/country')
const CONSTANTS = require('../src/constants')

test('getCountryCode - should fail on unsupported format', (t) => {
  t.exception(() => getCountryCode('GB', 'alpha3'), /ERR_CODE_FORMAT_NOT_SUPPORTED/)
})

test('getCountryCode - should return null in case if input is not string', (t) => {
  t.is(getCountryCode(123), null)
})

test('getCountryCode - should return null when country code doesn\'t exist', (t) => {
  t.is(getCountryCode('UK'), null)
  t.is(getCountryCode('United States'), null)
})

test('getCountryCode - should map iso-3166 alpha2 codes to iso-3166 alpha2 codes', (t) => {
  t.is(getCountryCode('GB', 'iso-3166-alpha2'), 'GB')
})

test('getCountryCode - should map iso-3166 alpha3 codes to iso-3166 alpha2 codes', (t) => {
  t.is(getCountryCode('GBR', 'iso-3166-alpha2'), 'GB')
})

test('getCountryCode - should map iso-3166 names to iso-3166 alpha2 codes', (t) => {
  t.is(getCountryCode('United Kingdom', 'iso-3166-alpha2'), 'GB')
})

test('getCountryCode - should map iso-3166 numeric codes to iso-3166 alpha2 codes', (t) => {
  t.is(getCountryCode('826', 'iso-3166-alpha2'), 'GB')
})

test('getCountryCode - should map iso-3166 alpha2 codes to iso-3166 alpha3 codes', (t) => {
  t.is(getCountryCode('GB', 'iso-3166-alpha3'), 'GBR')
})

test('getCountryCode - should map iso-3166 alpha3 codes to iso-3166 alpha3 codes', (t) => {
  t.is(getCountryCode('GBR', 'iso-3166-alpha3'), 'GBR')
})

test('getCountryCode - should map iso-3166 names to iso-3166 alpha3 codes', (t) => {
  t.is(getCountryCode('United Kingdom', 'iso-3166-alpha3'), 'GBR')
})

test('getCountryCode - should map iso-3166 numeric codes to iso-3166 alpha3 codes', (t) => {
  t.is(getCountryCode('826', 'iso-3166-alpha3'), 'GBR')
})

test('getCountryCode - should map iso-3166 alpha2 codes to iso-3166 numeric codes', (t) => {
  t.is(getCountryCode('GB', 'iso-3166-num'), '826')
})

test('getCountryCode - should map iso-3166 alpha3 codes to iso-3166 numeric codes', (t) => {
  t.is(getCountryCode('GBR', 'iso-3166-num'), '826')
})

test('getCountryCode - should map iso-3166 names to iso-3166 numeric codes', (t) => {
  t.is(getCountryCode('United Kingdom', 'iso-3166-num'), '826')
})

test('getCountryCode - should map iso-3166 numeric codes to iso-3166 numeric codes', (t) => {
  t.is(getCountryCode('826', 'iso-3166-num'), '826')
})

test('getCountryCode - should map iso-3166 alpha2 codes to iso-3166 names', (t) => {
  t.is(getCountryCode('GB', 'iso-3166-name'), 'UNITED KINGDOM')
})

test('getCountryCode - should map iso-3166 alpha3 codes to iso-3166 names', (t) => {
  t.is(getCountryCode('GBR', 'iso-3166-name'), 'UNITED KINGDOM')
})

test('getCountryCode - should map iso-3166 names to iso-3166 names', (t) => {
  t.is(getCountryCode('United Kingdom', 'iso-3166-name'), 'UNITED KINGDOM')
})

test('getCountryCode - should map iso-3166 numeric codes to iso-3166 names', (t) => {
  t.is(getCountryCode('826', 'iso-3166-name'), 'UNITED KINGDOM')
})

test('getCountryCode - should be case insensitive', (t) => {
  t.is(getCountryCode('united Kingdom'), 'GB')
})

test('getCountryCode - should trim spaces', (t) => {
  t.is(getCountryCode(' united Kingdom   '), 'GB')
})

const eeaCountryCodesList = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO']
const nonEeaCountries = Object.keys(CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_NUM).filter(cc => !eeaCountryCodesList.includes(cc))

test('isEeaCountry - should return true if a country is in the european economic area', (t) => {
  t.plan(eeaCountryCodesList.length)

  for (const countryCode of eeaCountryCodesList) {
    t.is(isEeaCountry(countryCode), true, countryCode)
  }
})

test('isEeaCountry - should return false if a country is not in the european economic area', (t) => {
  t.plan(nonEeaCountries.length)

  for (const countryCode of nonEeaCountries) {
    t.is(isEeaCountry(countryCode), false, countryCode)
  }
})
