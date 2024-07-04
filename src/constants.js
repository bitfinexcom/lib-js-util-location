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

module.exports = {
  CANADA_PROVINCES,
  CANADA_PROVINCE_FORMATS,
  COUNTRY_FORMATS,
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
  COUNTRY_ISO_3166_NUM_NAME
}
