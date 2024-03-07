import { instance } from "./axios";

export const fetchCountries = () => {
  return instance("/v3.1/all");
};
