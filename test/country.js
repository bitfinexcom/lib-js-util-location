'use strict'

/* eslint-env mocha */

const assert = require('assert')
const { getCountryCode } = require('..')
const { isEeaCountry } = require('../src/country')
const { itEach } = require('mocha-it-each')
const CONSTANTS = require('../src/constants')

describe('Country tests', () => {
  describe('getCountryCode tests', () => {
    it('should fail on unsupported format', () => {
      assert.throws(() => getCountryCode('GB', 'alpha3'), new Error('ERR_CODE_FORMAT_NOT_SUPPORTED'))
    })

    it('should return null in case if input is not string', () => {
      assert.strictEqual(getCountryCode(123), null)
    })

    it('should return null when country code doesn\'t exist', () => {
      assert.strictEqual(getCountryCode('UK'), null)
      assert.strictEqual(getCountryCode('United States'), null)
    })

    it('should map iso-3166 alpha2 codes to iso-3166 alpha2 codes', () => {
      assert.strictEqual(getCountryCode('GB', 'iso-3166-alpha2'), 'GB')
    })

    it('should map iso-3166 alpha3 codes to iso-3166 alpha2 codes', () => {
      assert.strictEqual(getCountryCode('GBR', 'iso-3166-alpha2'), 'GB')
    })

    it('should map iso-3166 names to iso-3166 alpha2 codes', () => {
      assert.strictEqual(getCountryCode('United Kingdom', 'iso-3166-alpha2'), 'GB')
    })

    it('should map iso-3166 numeric codes to iso-3166 alpha2 codes', () => {
      assert.strictEqual(getCountryCode('826', 'iso-3166-alpha2'), 'GB')
    })

    it('should map iso-3166 alpha2 codes to iso-3166 alpha3 codes', () => {
      assert.strictEqual(getCountryCode('GB', 'iso-3166-alpha3'), 'GBR')
    })

    it('should map iso-3166 alpha3 codes to iso-3166 alpha3 codes', () => {
      assert.strictEqual(getCountryCode('GBR', 'iso-3166-alpha3'), 'GBR')
    })

    it('should map iso-3166 names to iso-3166 alpha3 codes', () => {
      assert.strictEqual(getCountryCode('United Kingdom', 'iso-3166-alpha3'), 'GBR')
    })

    it('should map iso-3166 numeric codes to iso-3166 alpha3 codes', () => {
      assert.strictEqual(getCountryCode('826', 'iso-3166-alpha3'), 'GBR')
    })

    it('should map iso-3166 alpha2 codes to iso-3166 numeric codes', () => {
      assert.strictEqual(getCountryCode('GB', 'iso-3166-num'), '826')
    })

    it('should map iso-3166 alpha3 codes to iso-3166 numeric codes', () => {
      assert.strictEqual(getCountryCode('GBR', 'iso-3166-num'), '826')
    })

    it('should map iso-3166 names to iso-3166 numeric codes', () => {
      assert.strictEqual(getCountryCode('United Kingdom', 'iso-3166-num'), '826')
    })

    it('should map iso-3166 numeric codes to iso-3166 numeric codes', () => {
      assert.strictEqual(getCountryCode('826', 'iso-3166-num'), '826')
    })

    it('should map iso-3166 alpha2 codes to iso-3166 names', () => {
      assert.strictEqual(getCountryCode('GB', 'iso-3166-name'), 'UNITED KINGDOM')
    })

    it('should map iso-3166 alpha3 codes to iso-3166 names', () => {
      assert.strictEqual(getCountryCode('GBR', 'iso-3166-name'), 'UNITED KINGDOM')
    })

    it('should map iso-3166 names to iso-3166 names', () => {
      assert.strictEqual(getCountryCode('United Kingdom', 'iso-3166-name'), 'UNITED KINGDOM')
    })

    it('should map iso-3166 numeric codes to iso-3166 names', () => {
      assert.strictEqual(getCountryCode('826', 'iso-3166-name'), 'UNITED KINGDOM')
    })

    it('should be case insensitive', () => {
      assert.strictEqual(getCountryCode('united Kingdom'), 'GB')
    })

    it('should trim spaces', () => {
      assert.strictEqual(getCountryCode(' united Kingdom   '), 'GB')
    })
  })

  describe('isEeaCountry', () => {
    const eeaCountryCodesList = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO']
    const nonEeaCountries = Object.keys(CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_NUM).filter(cc => !eeaCountryCodesList.includes(cc))

    itEach('should return true if a country is in the european economic area',
      eeaCountryCodesList,
      async (countryCode) => {
        assert.strictEqual(isEeaCountry(countryCode), true)
      })

    itEach('should return false if a country is not in the  european economic area',
      nonEeaCountries,
      async (countryCode) => {
        assert.strictEqual(isEeaCountry(countryCode), false)
      })
  })
})
