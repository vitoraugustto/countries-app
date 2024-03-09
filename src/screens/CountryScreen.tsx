import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ICountry } from '@common/types';
import {
  decode,
  formatCapitals,
  formatCurrencies,
  formatLanguages,
} from '@common/utils';
import { Box, Text } from '@components';
import { Divider } from '@mui/material';
import { fetchCountry, generateCountryCuriosities } from '@services/countries';

export const CountryScreen = () => {
  const location = useParams() as { countryName: string };
  const [country, setCountry] = useState<ICountry>();
  const [countryCuriosities, setCountryCuriosities] = useState<string | null>(
    '',
  );

  useEffect(() => {
    fetchCountry(decode(location.countryName), true).then((res) =>
      setCountry(res.data[0]),
    );
  }, []);

  useEffect(() => {
    if (country) {
      generateCountryCuriosities(country.name.common).then((res) =>
        setCountryCuriosities(res.choices[0].message.content),
      );
    }
  }, [country]);

  return (
    <Box hCenter vCenter gap="20px" p="2%" height="100vh">
      <Box gap="12px" width="60%">
        <Box gap="28px" flexDirection="row">
          <Box vCenter gap="8px">
            <Text align="center" component="h1" variant="h1">
              {country?.name.common}
            </Text>
            <img
              style={{ borderRadius: '10px' }}
              src={country?.flags.png}
              alt={`Bandeira do país ${country?.name.common}`}
            />
          </Box>
          <Divider orientation="vertical" />
          <Box gap="12px">
            <Box>
              <Text fontWeight="600">Capital</Text>
              <Text fontSize="24px">
                {country ? formatCapitals(country) : '-'}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="600">População</Text>
              <Text fontSize="24px">{country ? country?.population : '-'}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Moeda</Text>
              <Text fontSize="24px">
                {country ? formatCurrencies(country) : '-'}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="600">Idioma</Text>
              <Text fontSize="24px">
                {country ? formatLanguages(country) : '-'}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text fontWeight="600">Curiosidades</Text>
          <Text fontSize="18px">{countryCuriosities}</Text>
        </Box>
      </Box>
    </Box>
  );
};
