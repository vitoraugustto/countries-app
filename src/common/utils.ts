import { ICountry } from './types';

export const unaccent = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const formatCapitals = (country: ICountry) => {
  if (country.capital?.length > 0) {
    return country.capital.join(', ');
  } else {
    return 'N/A';
  }
};

export const formatCurrencies = (country: ICountry) => {
  if (country.currencies) {
    return Object.keys(country.currencies)
      .map(
        (key) =>
          country.currencies[key].name + ` (${country.currencies[key].symbol})`,
      )
      .join(', ');
  } else {
    return 'N/A';
  }
};

export const formatLanguages = (country: ICountry) => {
  if (country.languages) {
    return Object.values(country.languages).join(', ');
  } else {
    return 'N/A';
  }
};
