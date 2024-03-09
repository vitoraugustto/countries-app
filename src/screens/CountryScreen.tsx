import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { decode } from '@common/utils';
import { Text } from '@components';
import { fetchCountry } from '@services/countries';

export const CountryScreen = () => {
  const location = useParams() as { countryName: string };

  useEffect(() => {
    fetchCountry(decode(location.countryName), true).then((res) =>
      console.log(res.data),
    );
  }, []);

  return <Text>Country Screen!</Text>;
};
