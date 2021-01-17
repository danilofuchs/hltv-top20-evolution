import { countries } from "countries-list";

type CountryCode = keyof typeof countries;

export function getCountryName(countryCode: string) {
  return (
    countries[countryCode.toUpperCase().trim() as CountryCode]?.name || null
  );
}

export function getCountryContinent(countryCode: string) {
  return (
    countries[countryCode.toUpperCase().trim() as CountryCode]?.continent ||
    null
  );
}

export function getCountryFlagSrc(countryCode: string) {
  return `https://cdn.jsdelivr.net/gh/madebybowtie/FlagKit@2.2/Assets/SVG/${countryCode}.svg`;
}
