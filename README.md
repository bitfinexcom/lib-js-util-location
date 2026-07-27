# lib-js-util-location

Simple utility library for locations.

Supported functions:
- getCountryCode - useful to parse country names to codes and vice-versa
- getCurrencyCode - useful to parse currency names/countries to codes and vice-versa
- getCountryCurrencies - currencies of a country
- getCurrencyCountries - countries using a currency

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
const {
  CONSTANTS,
  getCountryCode,
  getCanadaProvince,
  getCurrencyCode,
  getCountryCurrencies,
  getCurrencyCountries
} = require('@bitfinex/lib-js-util-location')

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
```

### Currencies

Currency data is generated from the official [ISO 4217 list one](https://www.six-group.com/en/products-services/financial-information/data-center.html)
published by SIX, the ISO 4217 maintenance agency.

Supported `getCurrencyCode` formats: `iso-4217-alpha3` (default), `iso-4217-num`, `iso-4217-name`.

`getCurrencyCode` accepts a currency in any of those formats, or a country in any format accepted by
`getCountryCode`. For countries with more than one ISO 4217 currency it returns the main one, while
`getCountryCurrencies` returns all of them (main currency first, fund codes last).

Notes:
- currency codes take precedence over country codes when both match an input, so `getCurrencyCode('CHE')`
  is the WIR Euro rather than Switzerland's `CHF`
- the list includes fund codes (`CLF`, `USN`, ...), precious metals (`XAU`, `XAG`, ...), supranational
  units (`XDR`, `XUA`, ...) and the reserved `XTS`/`XXX` codes. Those have no country, so
  `getCurrencyCountries` returns an empty list for them
- `VED` and `VES` share the name `BOLÍVAR SOBERANO`, which resolves to the current `VES`
- two entries of `COUNTRY_ISO_3166_ALPHA_2_NAME` are outside ISO 3166-1 and therefore outside ISO 4217,
  they are mapped manually: `XK` (Kosovo) to `EUR` and `AN` (Netherlands Antilles, deleted from
  ISO 3166 in 2010) to `XCG`, the successor of its retired `ANG`
- `AQ`, `GS` and `PS` have no currency mapping because ISO 4217 explicitly assigns them no universal
  currency, and neither do the non standard region entries (`CRIMEA`, `DONETSK`, `LUHANSK`,
  `KHERSON`, `ZAPORIZHZHIA`)

## Authors
- prdn
- vigan-abd
