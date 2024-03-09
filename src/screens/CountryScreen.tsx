import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ICountry, Status } from '@common/types';
import {
  decode,
  formatCapitals,
  formatCurrencies,
  formatLanguages,
} from '@common/utils';
import { Box, Text } from '@components';
import CancelIcon from '@mui/icons-material/Cancel';
import { Chip, CircularProgress, Divider } from '@mui/material';
import { fetchCountry, generateCountryCuriosities } from '@services/countries';

export const CountryScreen = () => {
  const location = useParams() as { countryName: string };
  const [country, setCountry] = useState<ICountry>();
  const [completionStatus, setCompletionStatus] = useState<Status>('idle');
  const [countryStatus, setCountryStatus] = useState<Status>('idle');

  const [countryCuriosities, setCountryCuriosities] = useState<string | null>(
    '',
  );

  const handleFetchCountry = () => {
    setCountryStatus('pending');

    fetchCountry(decode(location.countryName), true)
      .then((res) => {
        setCountryStatus('succeeded');
        setCountry(res.data[0]);
      })
      .catch(() => setCountryStatus('failed'));
  };

  const handleGenerateCountryCuriosities = () => {
    if (country) {
      setCompletionStatus('pending');
      generateCountryCuriosities(country.name.common)
        .then((res) => {
          setCompletionStatus('succeeded');
          setCountryCuriosities(res.choices[0].message.content);
        })
        .catch(() => setCompletionStatus('failed'));
    }
  };

  const handleCuriosities = () => {
    switch (completionStatus) {
      case 'failed':
        return 'Falha ao gerar curiosidades. Por favor, tente novamente mais tarde.';
      case 'succeeded':
        return countryCuriosities;
      default:
        return '...';
    }
  };

  useEffect(() => {
    handleFetchCountry();
  }, []);

  useEffect(() => {
    handleGenerateCountryCuriosities();
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
        <Box gap="12px">
          <Box vCenter flexDirection="row" gap="10px">
            <Text fontWeight="600">Curiosidades</Text>
            {completionStatus === 'pending' && (
              <CircularProgress size={20} thickness={5} />
            )}
            {completionStatus === 'succeeded' && (
              <Chip color="success" label="🤖 Gerado com IA" />
            )}
            {completionStatus === 'failed' && <CancelIcon color="error" />}
          </Box>
          <Text fontSize="18px">{handleCuriosities()}</Text>
          {completionStatus === 'succeeded' && (
            <Text fontSize="14px" color="gray" fontFamily="Titillium Web">
              IA pode cometer erros. Considere verificar informações
              importantes.
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
