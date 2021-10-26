'use strict'

/* eslint-env mocha */

const assert = require('assert')
const { getCanadaProvince } = require('..')

describe('State tests', () => {
  describe('getCanadaProvince tests', () => {
    it('should fail on unsupported format', () => {
      assert.throws(() => getCanadaProvince('Ont', 'alpha3'), new Error('ERR_CODE_FORMAT_NOT_SUPPORTED'))
    })

    it('should return null in case if input is not string', () => {
      assert.strictEqual(getCanadaProvince(35), null)
    })

    it('should return null when state is not found', () => {
      assert.strictEqual(getCanadaProvince('Atlantic'), null)
    })

    it('should find province by name', () => {
      assert.strictEqual(getCanadaProvince('Ontario'), 'ON')
    })

    it('should find province by english abbreviation', () => {
      assert.strictEqual(getCanadaProvince('PEI'), 'PE')
    })

    it('should find province by french abbreviation', () => {
      assert.strictEqual(getCanadaProvince('ÎPÉ'), 'PE')
    })

    it('should find province by international alpha code', () => {
      assert.strictEqual(getCanadaProvince('ON'), 'ON')
    })

    it('should find province by standard geographical classification code', () => {
      assert.strictEqual(getCanadaProvince('35'), 'ON')
    })

    it('should support name format', () => {
      assert.strictEqual(getCanadaProvince('35', 'name'), 'ONTARIO')
    })

    it('should support english abbreviation format', () => {
      assert.strictEqual(getCanadaProvince('11', 'en_abbr'), 'PEI')
    })

    it('should support french abbreviation format', () => {
      assert.strictEqual(getCanadaProvince('11', 'fr_abbr'), 'ÎPÉ')
    })

    it('should support international alpha code format', () => {
      assert.strictEqual(getCanadaProvince('Ontario', 'int_alpha_code'), 'ON')
    })

    it('should support standard geographical classification code format', () => {
      assert.strictEqual(getCanadaProvince('ONT', 'std_geo_code'), '35')
    })
  })
})
