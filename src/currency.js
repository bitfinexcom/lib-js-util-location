'use strict'

const CONSTANTS = require('./constants')
const { getCountryCode } = require('./country')

/**
 * Currencies of a country, ordered with its main currency first
 *
 * @param {string} input country in any format supported by getCountryCode
 * @returns {string[]} iso-4217 alpha3 currency codes
 */
const getCountryCurrencies = (input) => {
  const countryCode = getCountryCode(input, 'iso-3166-alpha2')
  if (!countryCode) return []

  return [...(CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_CURRENCY_ISO_4217_ALPHA_3[countryCode] || [])]
}

/**
 * @param {string} input currency in iso-4217 alpha3, numeric or name format, or a country in any
 *   format supported by getCountryCode, in which case its main currency is used
 * @param {string} [format]
 * @returns {string|null}
 */
const getCurrencyCode = (input, format = 'iso-4217-alpha3') => {
  if (!CONSTANTS.CURRENCY_FORMATS.includes(format)) throw new Error('ERR_CODE_FORMAT_NOT_SUPPORTED')
  if (typeof input !== 'string') return null

  input = input.trim().toUpperCase()

  const alpha3 = CONSTANTS.CURRENCY_ISO_4217_ALPHA_3_NUM[input]
    ? input
    : CONSTANTS.CURRENCY_ISO_4217_NUM_ALPHA_3[input] ||
      CONSTANTS.CURRENCY_ISO_4217_NAME_ALPHA_3[input] ||
      getCountryCurrencies(input)[0]

  if (!alpha3) return null

  switch (format) {
    case 'iso-4217-alpha3':
      return alpha3
    case 'iso-4217-num':
      return CONSTANTS.CURRENCY_ISO_4217_ALPHA_3_NUM[alpha3]
    case 'iso-4217-name':
      return CONSTANTS.CURRENCY_ISO_4217_ALPHA_3_NAME[alpha3]
  }
}

/**
 * Countries using a currency, empty for currencies with no country (XAU, XDR, ...)
 *
 * @param {string} input currency or country in any format supported by getCurrencyCode
 * @returns {string[]} iso-3166 alpha2 country codes
 */
const getCurrencyCountries = (input) => {
  const currencyCode = getCurrencyCode(input, 'iso-4217-alpha3')
  if (!currencyCode) return []

  return [...(CONSTANTS.CURRENCY_ISO_4217_ALPHA_3_COUNTRY_ISO_3166_ALPHA_2[currencyCode] || [])]
}

module.exports = {
  getCountryCurrencies,
  getCurrencyCode,
  getCurrencyCountries
}
