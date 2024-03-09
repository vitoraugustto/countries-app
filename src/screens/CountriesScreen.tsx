import { useState } from 'react';

import { ICountry, Status } from '@common/types';
import { unaccent } from '@common/utils';
import { Box, Button, Input, Text } from '@components';
import HistoryIcon from '@mui/icons-material/History';
import { Chip } from '@mui/material';
import { fetchCountry } from '@services/countries';

import { CountriesDataGrid } from './components/CountriesDataGrid';
import { CountryCards } from './components/CountryCards';

export const CountriesScreen = () => {
  const [history, setHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem('history') ?? '[]'),
  );
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [presentationMode, setPresentationMode] = useState<'grid' | 'card'>(
    'grid',
  );

  const removeFromHistory = (historyItem: string) => {
    const updatedHistory = history.filter(
      (item: string) => item !== historyItem,
    );

    localStorage.setItem('history', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const handleFetchCountry = (_countryName: string) => {
    setStatus('pending');

    fetchCountry(unaccent(_countryName))
      .then((res) => {
        setStatus('succeeded');
        setCountries(res.data);
      })
      .catch(() => setStatus('failed'));
  };
  return (
    <Box gap="20px" p="2%" height="100vh">
      <Box gap="24px">
        <Box gap="4px">
          <Text fontSize="14px" fontFamily="Titillium Web">
            Modo de apresentação
          </Text>
          <Box gap="12px" flexDirection="row">
            <Button
              minWidth="100px"
              variant={presentationMode === 'grid' ? 'contained' : 'outlined'}
              fullWidth={false}
              text="Tabela"
              onClick={() => setPresentationMode('grid')}
            />
            <Button
              minWidth="100px"
              variant={presentationMode === 'card' ? 'contained' : 'outlined'}
              fullWidth={false}
              text="Cartões"
              onClick={() => setPresentationMode('card')}
            />
          </Box>
        </Box>
        <Box minHeight="36px" flexDirection="row" vCenter gap="14px">
          <HistoryIcon color="info" />
          {history.map((historyItem: string, index) => (
            <Chip
              key={index}
              color="info"
              variant="outlined"
              label={historyItem}
              onClick={() => {
                if (countries.length > 0) {
                  setCountries([]);
                }

                handleFetchCountry(historyItem);
              }}
              onDelete={() => removeFromHistory(historyItem)}
            />
          ))}
        </Box>
        <Box flexDirection="row" gap="12px">
          <Input
            debouncedValue={(debouncedValue) => {
              if (!debouncedValue) return;

              const updatedHistory = [debouncedValue, ...history.slice(0, 4)];
              localStorage.setItem('history', JSON.stringify(updatedHistory));

              setHistory(updatedHistory);
              handleFetchCountry(debouncedValue);
            }}
            fullWidth
            label="Nome do país"
            value={countryName}
            onChange={(e) => {
              if (countries.length > 0) {
                setCountries([]);
              }

              setCountryName(e.target.value);
            }}
            helperText={`Alguns países podem não aparecer se pesquisados em português. Exemplo: Cazaquistão (Kazakhstan)`}
          />
        </Box>

        {presentationMode === 'grid' ? (
          <CountriesDataGrid status={status} countries={countries} />
        ) : (
          <CountryCards countries={countries} />
        )}
      </Box>
    </Box>
  );
};
