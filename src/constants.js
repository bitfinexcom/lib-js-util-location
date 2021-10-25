'use strict'

const COUNTRY_FORMATS = Object.freeze([
  'iso-3166-alpha2',
  'iso-3166-alpha3',
  'iso-3166-name',
  'iso-3166-num'
])

const COUNTRY_ISO_3166_ALPHA_2_ALPHA_3 = require('./countries-iso-3166-alpha2-to-alpha3.json')
const COUNTRY_ISO_3166_ALPHA_2_NAME = require('./countries-iso-3166-alpha2-to-name.json')
const COUNTRY_ISO_3166_ALPHA_2_NUM = require('./countries-iso-3166-alpha2-to-num.json')

const COUNTRY_ISO_3166_ALPHA_3_ALPHA_2 = require('./countries-iso-3166-alpha3-to-alpha2.json')
const COUNTRY_ISO_3166_ALPHA_3_NAME = require('./countries-iso-3166-alpha3-to-name.json')
const COUNTRY_ISO_3166_ALPHA_3_NUM = require('./countries-iso-3166-alpha3-to-num.json')

const COUNTRY_ISO_3166_NAME_ALPHA_2 = require('./countries-iso-3166-name-to-alpha2.json')
const COUNTRY_ISO_3166_NAME_ALPHA_3 = require('./countries-iso-3166-name-to-alpha3.json')
const COUNTRY_ISO_3166_NAME_NUM = require('./countries-iso-3166-name-to-num.json')

const COUNTRY_ISO_3166_NUM_ALPHA_2 = require('./countries-iso-3166-num-to-alpha2.json')
const COUNTRY_ISO_3166_NUM_ALPHA_3 = require('./countries-iso-3166-num-to-alpha3.json')
const COUNTRY_ISO_3166_NUM_NAME = require('./countries-iso-3166-num-to-name.json')

module.exports = {
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
