type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type Status = 'succeeded' | 'failed' | 'idle' | 'pending';

export interface ICountry {
  altSpellings: string[];
  capital: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  flag: string;
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  languages: { [key: string]: string };
  name: { common: string };
  population: number;
}
