import { AxiosPromise } from 'axios';

import { ICountry } from '@common/types';

import { instance } from './axios';

export const fetchCountries = () => {
  return instance('/v3.1/all');
};

export const fetchCountry = (
  name: string,
  exact: boolean = false,
): AxiosPromise<ICountry[]> => {
  return instance(`/v3.1/name/${name}?fullText=${exact}`);
};
