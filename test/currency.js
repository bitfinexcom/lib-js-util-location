'use strict'

const test = require('brittle')
const { getCountryCurrencies, getCurrencyCode, getCurrencyCountries } = require('..')
const CONSTANTS = require('../src/constants')

test('getCurrencyCode - should fail on unsupported format', (t) => {
  t.exception(() => getCurrencyCode('ALL', 'alpha3'), /ERR_CODE_FORMAT_NOT_SUPPORTED/)
})

test('getCurrencyCode - should return null in case if input is not string', (t) => {
  t.is(getCurrencyCode(123), null)
})

test('getCurrencyCode - should return null when currency code doesn\'t exist', (t) => {
  t.is(getCurrencyCode('ZZZ'), null)
  t.is(getCurrencyCode('Lekk'), null)
  t.is(getCurrencyCode('999999'), null)
})

test('getCurrencyCode - should map iso-4217 alpha3 codes to iso-4217 alpha3 codes', (t) => {
  t.is(getCurrencyCode('ALL', 'iso-4217-alpha3'), 'ALL')
})

test('getCurrencyCode - should map iso-4217 numeric codes to iso-4217 alpha3 codes', (t) => {
  t.is(getCurrencyCode('008', 'iso-4217-alpha3'), 'ALL')
})

test('getCurrencyCode - should map iso-4217 names to iso-4217 alpha3 codes', (t) => {
  t.is(getCurrencyCode('Lek', 'iso-4217-alpha3'), 'ALL')
})

test('getCurrencyCode - should map countries to iso-4217 alpha3 codes', (t) => {
  t.is(getCurrencyCode('Albania', 'iso-4217-alpha3'), 'ALL')
  t.is(getCurrencyCode('AL', 'iso-4217-alpha3'), 'ALL')
  t.is(getCurrencyCode('ALB', 'iso-4217-alpha3'), 'ALL')
})

test('getCurrencyCode - should map iso-4217 alpha3 codes to iso-4217 numeric codes', (t) => {
  t.is(getCurrencyCode('ALL', 'iso-4217-num'), '008')
})

test('getCurrencyCode - should map iso-4217 numeric codes to iso-4217 numeric codes', (t) => {
  t.is(getCurrencyCode('008', 'iso-4217-num'), '008')
})

test('getCurrencyCode - should map iso-4217 names to iso-4217 numeric codes', (t) => {
  t.is(getCurrencyCode('Lek', 'iso-4217-num'), '008')
})

test('getCurrencyCode - should map countries to iso-4217 numeric codes', (t) => {
  t.is(getCurrencyCode('Albania', 'iso-4217-num'), '008')
})

test('getCurrencyCode - should map iso-4217 alpha3 codes to iso-4217 names', (t) => {
  t.is(getCurrencyCode('ALL', 'iso-4217-name'), 'LEK')
})

test('getCurrencyCode - should map iso-4217 numeric codes to iso-4217 names', (t) => {
  t.is(getCurrencyCode('008', 'iso-4217-name'), 'LEK')
})

test('getCurrencyCode - should map iso-4217 names to iso-4217 names', (t) => {
  t.is(getCurrencyCode('Lek', 'iso-4217-name'), 'LEK')
})

test('getCurrencyCode - should map countries to iso-4217 names', (t) => {
  t.is(getCurrencyCode('Albania', 'iso-4217-name'), 'LEK')
})

test('getCurrencyCode - should default to iso-4217 alpha3 format', (t) => {
  t.is(getCurrencyCode('008'), 'ALL')
  t.is(getCurrencyCode('Lek'), 'ALL')
})

test('getCurrencyCode - should be case insensitive', (t) => {
  t.is(getCurrencyCode('all'), 'ALL')
  t.is(getCurrencyCode('lek'), 'ALL')
  t.is(getCurrencyCode('albania'), 'ALL')
})

test('getCurrencyCode - should trim spaces', (t) => {
  t.is(getCurrencyCode('  lek '), 'ALL')
  t.is(getCurrencyCode('  albania   '), 'ALL')
})

test('getCurrencyCode - should resolve multi word currency names', (t) => {
  t.is(getCurrencyCode('Pound Sterling'), 'GBP')
  t.is(getCurrencyCode('New Zealand Dollar'), 'NZD')
  t.is(getCurrencyCode('BOLÍVAR SOBERANO'), 'VES')
})

test('getCurrencyCode - should prefer currency codes over country codes on collision', (t) => {
  t.is(getCurrencyCode('CHE'), 'CHE') // WIR Euro, not Switzerland
  t.is(getCurrencyCode('CH'), 'CHF')
})

test('getCurrencyCode - should resolve currencies without a country', (t) => {
  t.is(getCurrencyCode('XAU', 'iso-4217-name'), 'GOLD')
  t.is(getCurrencyCode('XDR', 'iso-4217-alpha3'), 'XDR')
})

test('getCurrencyCode - should resolve the main currency of multi currency countries', (t) => {
  t.is(getCurrencyCode('Bhutan'), 'BTN')
  t.is(getCurrencyCode('Panama'), 'PAB')
  t.is(getCurrencyCode('Switzerland'), 'CHF')
  t.is(getCurrencyCode('United States of America'), 'USD')
  t.is(getCurrencyCode('Venezuela'), 'VES')
})

test('getCurrencyCode - every currency should map in every supported format', (t) => {
  const codes = Object.keys(CONSTANTS.CURRENCY_ISO_4217_ALPHA_3_NUM)

  for (const code of codes) {
    for (const format of CONSTANTS.CURRENCY_FORMATS) {
      const mapped = getCurrencyCode(code, format)
      t.ok(mapped, `${code} -> ${format}`)

      // VED shares its name with VES, so it's the only code that doesn't round trip by name
      if (format === 'iso-4217-name' && code === 'VED') continue
      t.is(getCurrencyCode(mapped, 'iso-4217-alpha3'), code, `${code} -> ${format} -> alpha3`)
    }
  }
})

test('getCurrencyCode - should resolve the name shared by VED and VES to the current VES', (t) => {
  t.is(getCurrencyCode('VED', 'iso-4217-name'), 'BOLÍVAR SOBERANO')
  t.is(getCurrencyCode('VES', 'iso-4217-name'), 'BOLÍVAR SOBERANO')
  t.is(getCurrencyCode('BOLÍVAR SOBERANO'), 'VES')
})

test('getCountryCurrencies - should return the currencies of a country', (t) => {
  t.alike(getCountryCurrencies('Albania'), ['ALL'])
  t.alike(getCountryCurrencies('AL'), ['ALL'])
  t.alike(getCountryCurrencies('ALB'), ['ALL'])
  t.alike(getCountryCurrencies('008'), ['ALL'])
})

test('getCountryCurrencies - should list every currency of multi currency countries', (t) => {
  t.alike(getCountryCurrencies('Switzerland'), ['CHF', 'CHE', 'CHW'])
  t.alike(getCountryCurrencies('Panama'), ['PAB', 'USD'])
})

test('getCountryCurrencies - should return empty list for unknown countries', (t) => {
  t.alike(getCountryCurrencies('UK'), [])
  t.alike(getCountryCurrencies(123), [])
})

test('getCountryCurrencies - should return empty list for countries without an iso-4217 currency', (t) => {
  t.alike(getCountryCurrencies('Antarctica'), [])
  t.alike(getCountryCurrencies('Palestine'), [])
  t.alike(getCountryCurrencies('South Georgia and the South Sandwich Islands'), [])
})

test('getCountryCurrencies - should return empty list for the non standard regions', (t) => {
  for (const region of ['CRIMEA', 'DONETSK', 'LUHANSK', 'KHERSON', 'ZAPORIZHZHIA']) {
    t.alike(getCountryCurrencies(region), [], region)
  }
})

test('getCountryCurrencies - should resolve countries outside of iso-4217', (t) => {
  t.alike(getCountryCurrencies('Kosovo'), ['EUR'])
  t.alike(getCountryCurrencies('XK'), ['EUR'])
  t.is(getCurrencyCode('Kosovo'), 'EUR')
  t.ok(getCurrencyCountries('EUR').includes('XK'))

  t.alike(getCountryCurrencies('Netherlands Antilles'), ['XCG'])
  t.alike(getCountryCurrencies('AN'), ['XCG'])
  t.is(getCurrencyCode('Netherlands Antilles'), 'XCG')
  t.ok(getCurrencyCountries('XCG').includes('AN'))
})

test('getCountryCurrencies - should not expose the underlying constant', (t) => {
  const currencies = getCountryCurrencies('Albania')
  currencies.push('USD')

  t.alike(getCountryCurrencies('Albania'), ['ALL'])
})

test('getCurrencyCountries - should return the countries of a currency', (t) => {
  t.alike(getCurrencyCountries('ALL'), ['AL'])
  t.alike(getCurrencyCountries('008'), ['AL'])
  t.alike(getCurrencyCountries('Lek'), ['AL'])
  t.alike(getCurrencyCountries('Albania'), ['AL'])
})

test('getCurrencyCountries - should list every country of a shared currency', (t) => {
  const countries = getCurrencyCountries('EUR')

  t.ok(countries.length > 1)
  t.ok(countries.includes('DE'))
  t.ok(countries.includes('FR'))
  t.absent(countries.includes('CH'))
})

test('getCurrencyCountries - should return empty list for currencies without a country', (t) => {
  t.alike(getCurrencyCountries('XAU'), [])
  t.alike(getCurrencyCountries('XDR'), [])
})

test('getCurrencyCountries - should return empty list for unknown currencies', (t) => {
  t.alike(getCurrencyCountries('ZZZ'), [])
  t.alike(getCurrencyCountries(123), [])
})

test('getCurrencyCountries - should not expose the underlying constant', (t) => {
  const countries = getCurrencyCountries('ALL')
  countries.push('XX')

  t.alike(getCurrencyCountries('ALL'), ['AL'])
})

test('constants - country and currency mappings should be consistent', (t) => {
  const { CURRENCY_ISO_4217_ALPHA_3_COUNTRY_ISO_3166_ALPHA_2: byCurrency } = CONSTANTS
  const { COUNTRY_ISO_3166_ALPHA_2_CURRENCY_ISO_4217_ALPHA_3: byCountry } = CONSTANTS

  for (const [currency, countries] of Object.entries(byCurrency)) {
    for (const country of countries) {
      t.ok(byCountry[country].includes(currency), `${currency} <-> ${country}`)
    }
  }

  for (const [country, currencies] of Object.entries(byCountry)) {
    t.ok(CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_NUM[country], `${country} is a known country`)

    for (const currency of currencies) {
      t.ok(byCurrency[currency].includes(country), `${country} <-> ${currency}`)
    }
  }
})
