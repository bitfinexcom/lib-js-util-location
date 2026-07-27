'use strict'

const CANADA_PROVINCES = require('./canada-provinces.json')

const reverser = el => el.reverse()

const CANADA_PROVINCE_FORMATS = Object.freeze([
  'name',
  'en_abbr',
  'fr_abbr',
  'int_alpha_code',
  'std_geo_code',
  'fr_name'
])

const COUNTRY_FORMATS = Object.freeze([
  'iso-3166-alpha2',
  'iso-3166-alpha3',
  'iso-3166-name',
  'iso-3166-num'
])

const CURRENCY_FORMATS = Object.freeze([
  'iso-4217-alpha3',
  'iso-4217-name',
  'iso-4217-num'
])

const COUNTRY_ISO_3166_ALPHA_2_ALPHA_3 = require('./countries-iso-3166-alpha2-to-alpha3.json')
const COUNTRY_ISO_3166_ALPHA_2_NAME = require('./countries-iso-3166-alpha2-to-name.json')
const COUNTRY_ISO_3166_ALPHA_2_NUM = require('./countries-iso-3166-alpha2-to-num.json')

const COUNTRY_ISO_3166_ALPHA_3_ALPHA_2 = Object.fromEntries(Object.entries(COUNTRY_ISO_3166_ALPHA_2_ALPHA_3).map(reverser))
const COUNTRY_ISO_3166_ALPHA_3_NAME = require('./countries-iso-3166-alpha3-to-name.json')
const COUNTRY_ISO_3166_ALPHA_3_NUM = require('./countries-iso-3166-alpha3-to-num.json')

const COUNTRY_ISO_3166_NAME_ALPHA_2 = Object.fromEntries(Object.entries(COUNTRY_ISO_3166_ALPHA_2_NAME).map(reverser))
const COUNTRY_ISO_3166_NAME_ALPHA_3 = Object.fromEntries(Object.entries(COUNTRY_ISO_3166_ALPHA_3_NAME).map(reverser))
const COUNTRY_ISO_3166_NAME_NUM = require('./countries-iso-3166-name-to-num.json')

const COUNTRY_ISO_3166_NUM_ALPHA_2 = Object.fromEntries(Object.entries(COUNTRY_ISO_3166_ALPHA_2_NUM).map(reverser))
const COUNTRY_ISO_3166_NUM_ALPHA_3 = Object.fromEntries(Object.entries(COUNTRY_ISO_3166_ALPHA_3_NUM).map(reverser))
const COUNTRY_ISO_3166_NUM_NAME = Object.fromEntries(Object.entries(COUNTRY_ISO_3166_NAME_NUM).map(reverser))

const EEA_COUNTRIES_ISO_3166_ALPHA2_NUM = require('./eea-countries-iso-3166-alpha2.json')

const CURRENCY_ISO_4217_ALPHA_3_NAME = require('./currencies-iso-4217-alpha3-to-name.json')
const CURRENCY_ISO_4217_ALPHA_3_NUM = require('./currencies-iso-4217-alpha3-to-num.json')

// VED and VES share the name BOLÍVAR SOBERANO, the reverse map resolves it to the current VES
const CURRENCY_ISO_4217_NAME_ALPHA_3 = Object.fromEntries(Object.entries(CURRENCY_ISO_4217_ALPHA_3_NAME).map(reverser))
const CURRENCY_ISO_4217_NUM_ALPHA_3 = Object.fromEntries(Object.entries(CURRENCY_ISO_4217_ALPHA_3_NUM).map(reverser))

const CURRENCY_ISO_4217_ALPHA_3_COUNTRY_ISO_3166_ALPHA_2 = require('./currencies-iso-4217-alpha3-to-countries-iso-3166-alpha2.json')
const COUNTRY_ISO_3166_ALPHA_2_CURRENCY_ISO_4217_ALPHA_3 = require('./countries-iso-3166-alpha2-to-currencies-iso-4217-alpha3.json')

module.exports = {
  CANADA_PROVINCES,
  CANADA_PROVINCE_FORMATS,
  COUNTRY_FORMATS,
  CURRENCY_FORMATS,
  COUNTRY_ISO_3166_ALPHA_2_ALPHA_3,
  COUNTRY_ISO_3166_ALPHA_2_NAME,
  COUNTRY_ISO_3166_ALPHA_2_NUM,
  COUNTRY_ISO_3166_ALPHA_3_ALPHA_2,
  COUNTRY_ISO_3166_ALPHA_3_NAME,
  COUNTRY_ISO_3166_ALPHA_3_NUM,
  COUNTRY_ISO_3166_NAME_ALPHA_2,
  COUNTRY_ISO_3166_NAME_ALPHA_3,
  COUNTRY_ISO_3166_NAME_NUM,
  COUNTRY_ISO_3166_NUM_ALPHA_2,
  COUNTRY_ISO_3166_NUM_ALPHA_3,
  COUNTRY_ISO_3166_NUM_NAME,
  EEA_COUNTRIES_ISO_3166_ALPHA2_NUM,
  CURRENCY_ISO_4217_ALPHA_3_NAME,
  CURRENCY_ISO_4217_ALPHA_3_NUM,
  CURRENCY_ISO_4217_NAME_ALPHA_3,
  CURRENCY_ISO_4217_NUM_ALPHA_3,
  CURRENCY_ISO_4217_ALPHA_3_COUNTRY_ISO_3166_ALPHA_2,
  COUNTRY_ISO_3166_ALPHA_2_CURRENCY_ISO_4217_ALPHA_3
}
