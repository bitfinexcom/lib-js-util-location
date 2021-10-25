'use strict'

const { CONSTANTS, getCountryCode } = require('..')

console.log(getCountryCode('United Kingdom')) // 'GB'
console.log(getCountryCode('United Kingdom', 'iso-3166-alpha3')) // 'GBR'
console.log(getCountryCode('GB')) // 'GB'
console.log(getCountryCode('Great Britain')) // null
console.log(getCountryCode(CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_NUM.GB)) // 'GB'
console.log(CONSTANTS.COUNTRY_ISO_3166_NAME_ALPHA_2['UNITED KINGDOM']) // 'GB'
