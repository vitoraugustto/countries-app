import { AxiosPromise } from 'axios';

import { ICountry } from '@common/types';
import { OPENAI_CONTEXT, OPENAI_REPLACE_KEY } from '@config/api';

import { instance } from './axios';
import { chatCompletion } from './openai';

export const fetchCountries = () => {
  return instance('/v3.1/all');
};

export const fetchCountry = (
  name: string,
  exact: boolean = false,
): AxiosPromise<ICountry[]> => {
  return instance(`/v3.1/name/${name}?fullText=${exact}`);
};

export const generateCountryCuriosities = (
  countryName: ICountry['name']['common'],
) => {
  return chatCompletion([
    {
      role: 'system',
      content: OPENAI_CONTEXT.replace(OPENAI_REPLACE_KEY, countryName),
    },
  ]);
};
