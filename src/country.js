'use strict'

const CONSTANTS = require('./constants')

/**
 * @param {string} input
 * @param {string} [format]
 * @returns {string|null}
 */
const getCountryCode = (input, format = 'iso-3166-alpha2') => {
  if (!CONSTANTS.COUNTRY_FORMATS.includes(format)) throw new Error('ERR_CODE_FORMAT_NOT_SUPPORTED')
  if (typeof input !== 'string') return null

  input = input.trim().toUpperCase()

  let keyMap = {}
  const valMaps = []

  switch (format) {
    case 'iso-3166-alpha2':
      keyMap = CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_NUM
      valMaps.push(
        CONSTANTS.COUNTRY_ISO_3166_ALPHA_3_ALPHA_2,
        CONSTANTS.COUNTRY_ISO_3166_NAME_ALPHA_2,
        CONSTANTS.COUNTRY_ISO_3166_NUM_ALPHA_2
      )
      break
    case 'iso-3166-alpha3':
      keyMap = CONSTANTS.COUNTRY_ISO_3166_ALPHA_3_NUM
      valMaps.push(
        CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_ALPHA_3,
        CONSTANTS.COUNTRY_ISO_3166_NAME_ALPHA_3,
        CONSTANTS.COUNTRY_ISO_3166_NUM_ALPHA_3
      )
      break
    case 'iso-3166-name':
      keyMap = CONSTANTS.COUNTRY_ISO_3166_NAME_NUM
      valMaps.push(
        CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_NAME,
        CONSTANTS.COUNTRY_ISO_3166_ALPHA_3_NAME,
        CONSTANTS.COUNTRY_ISO_3166_NUM_NAME
      )
      break
    case 'iso-3166-num':
      keyMap = CONSTANTS.COUNTRY_ISO_3166_NUM_ALPHA_2
      valMaps.push(
        CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_NUM,
        CONSTANTS.COUNTRY_ISO_3166_ALPHA_3_NUM,
        CONSTANTS.COUNTRY_ISO_3166_NAME_NUM
      )
      break
  }

  if (keyMap[input]) return input
  for (const valMap of valMaps) {
    const val = valMap[input]
    if (val) return val
  }

  return null
}

const isEeaCountry = (countryCodeAlpha2) => !!CONSTANTS.EEA_COUNTRIES_ISO_3166_ALPHA2_NUM[countryCodeAlpha2]

module.exports = {
  getCountryCode,
  isEeaCountry
}
