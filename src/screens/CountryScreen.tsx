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
import { Chip, CircularProgress, Divider, Skeleton } from '@mui/material';
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
    } else {
      setCompletionStatus('failed');
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
    <Box>
      <Box hCenter vCenter gap="20px" p="2%" minHeight="100vh">
        <Box gap="12px" width="60%">
          {(countryStatus === 'pending' || countryStatus === 'failed') && (
            <CountrySkeleton />
          )}
          {countryStatus === 'failed' && (
            <Text color="error">
              Falha ao carregar país. Por favor, tente novamente mais tarde.
            </Text>
          )}
          {countryStatus === 'succeeded' && (
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
                <CountryInfo
                  title="Capital"
                  text={country ? formatCapitals(country) : '-'}
                />
                <CountryInfo
                  title="População"
                  text={country ? country?.population : '-'}
                />
                <CountryInfo
                  title="Moeda"
                  text={country ? formatCurrencies(country) : '-'}
                />
                <CountryInfo
                  title="Idioma"
                  text={country ? formatLanguages(country) : '-'}
                />
              </Box>
            </Box>
          )}

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
    </Box>
  );
};

const CountrySkeleton = () => {
  return (
    <Box gap="28px" flexDirection="row">
      <Box hCenter gap="8px">
        <Skeleton variant="text" width="85px" height="34px" />
        <Skeleton variant="rounded" width="320px" height="230px" />
      </Box>
      <Divider orientation="vertical" />
      <Box gap="12px">
        <Box>
          <Skeleton variant="text" width="65px" height="24px" />
          <Skeleton variant="text" width="105px" height="32px" />
        </Box>
        <Box>
          <Skeleton variant="text" width="75px" height="24px" />
          <Skeleton variant="text" width="130px" height="32px" />
        </Box>
        <Box>
          <Skeleton variant="text" width="60px" height="24px" />
          <Skeleton variant="text" width="250px" height="32px" />
        </Box>
        <Box>
          <Skeleton variant="text" width="75px" height="24px" />
          <Skeleton variant="text" width="130px" height="32px" />
        </Box>
      </Box>
    </Box>
  );
};

const CountryInfo: React.FC<{ title: string; text: string | number }> = ({
  title,
  text,
}) => {
  return (
    <Box>
      <Text fontWeight="600">{title}</Text>
      <Text fontSize="24px">{text}</Text>
    </Box>
  );
};
