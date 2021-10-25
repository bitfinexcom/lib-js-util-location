# lib-js-util-location

Simple utility library for locations.

Supported functions:
- getCountryCode - useful to parse country names to codes and vice-versa

## Installing
```console
npm install --save-prod https://github.com/bitfinexcom/lib-js-util-location.git
```

## Testing
```console
npm run test
```

## Usage
```javascript
const { CONSTANTS, getCountryCode } = require('@bitfinex/lib-js-util-location')

console.log(getCountryCode('United Kingdom')) // 'GB'
console.log(getCountryCode('United Kingdom', 'iso-3166-alpha3')) // 'GBR'
console.log(getCountryCode('GB')) // 'GB'
console.log(getCountryCode('Great Britain')) // null
console.log(getCountryCode(CONSTANTS.COUNTRY_ISO_3166_ALPHA_2_NUM.GB)) // 'GB'
console.log(CONSTANTS.COUNTRY_ISO_3166_NAME_ALPHA_2['UNITED KINGDOM']) // 'GB'

```

## Authors
- prdn
- vigan-abd
