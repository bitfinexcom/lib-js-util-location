'use strict'

const {
  CONSTANTS,
  getCountryCode,
  getCanadaProvince,
  getCurrencyCode,
  getCountryCurrencies,
  getCurrencyCountries
} = require('..')

console.log(getCountryCode('United Kingdom')) // 'GB'
console.log(getCountryCode('United Kingdom', 'iso-3166-alpha3')) // 'GBR'
console.log(getCountryCode('GB')) // 'GB'
console.log(getCountryCode('Great Britain')) // null
console.log(getCountryCode(CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_NUM.GB)) // 'GB'
console.log(CONSTANTS.COUNTRY_ISO_3166_NAME_ALPHA_2['UNITED KINGDOM']) // 'GB'

console.log(getCanadaProvince('Ontario', 'int_alpha_code')) // 'ON'

console.log(getCurrencyCode('ALL')) // 'ALL'
console.log(getCurrencyCode('ALL', 'iso-4217-num')) // '008'
console.log(getCurrencyCode('ALL', 'iso-4217-name')) // 'LEK'
console.log(getCurrencyCode('008')) // 'ALL'
console.log(getCurrencyCode('Lek')) // 'ALL'
console.log(getCurrencyCode('Albania')) // 'ALL'
console.log(getCurrencyCode('Albanian Lek')) // null
console.log(CONSTANTS.CURRENCY_ISO_4217_NAME_ALPHA_3.LEK) // 'ALL'

console.log(getCurrencyCountries('ALL')) // ['AL']
console.log(getCurrencyCountries('CHF')) // ['LI', 'CH']
console.log(getCurrencyCountries('XAU')) // []

console.log(getCountryCurrencies('Albania')) // ['ALL']
console.log(getCountryCurrencies('Switzerland')) // ['CHF', 'CHE', 'CHW']
