import { instance } from './axios';

export const fetchCountries = () => {
  return instance('/v3.1/all');
};

export const fetchCountry = (name: string, exact: boolean = false) => {
  return instance(`/v3.1/name/${name}?fullText=${exact}`);
};
