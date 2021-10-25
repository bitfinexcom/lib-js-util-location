'use strict'

const _isString = require('lodash/isString')
const { CANADA_PROVINCES, CANADA_PROVINCE_FORMATS } = require('./constants')

const getCanadaProvince = (input, format = 'int_alpha_code') => {
  if (!CANADA_PROVINCE_FORMATS.includes(format)) throw new Error('ERR_CODE_FORMAT_NOT_SUPPORTED')
  if (!_isString(input)) return null
  const inputs = input.trim().replace(/[-.]/g).toUpperCase().split('/')

  const idx = CANADA_PROVINCES.findIndex((state) => {
    for (const value of inputs) {
      if (CANADA_PROVINCE_FORMATS.some(field => state[field] === value)) return true
    }

    return false
  })

  if (idx === -1) return null

  return CANADA_PROVINCES[idx][format]
}

module.exports = {
  getCanadaProvince
}
