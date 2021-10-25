'use strict'

const CONSTANTS = require('./src/constants')
const { getCanadaProvince } = require('./src/state')
const { getCountryCode } = require('./src/country')

module.exports = {
  getCanadaProvince,
  getCountryCode,
  CONSTANTS
}
