import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ICountry, Status } from '@common/types';
import {
  encode,
  formatCapitals,
  formatCurrencies,
  formatLanguages,
  unaccent,
} from '@common/utils';
import { Box, Button, Input, Text } from '@components';
import HistoryIcon from '@mui/icons-material/History';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Chip, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, ptBR } from '@mui/x-data-grid';
import { fetchCountry } from '@services/countries';

export const CountriesScreen = () => {
  const navigate = useNavigate();

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

  const dataGridRows = countries.map((country) => ({
    id: country.name.common,
    flag: country.flags.png,
    name: country.name.common,
    population: country.population,
    capital: formatCapitals(country),
    currencies: formatCurrencies(country),
    languages: formatLanguages(country),
  }));

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
          {history.map((historyItem: string) => (
            <Chip
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
            helperText={`Alguns países podem não aparecer se procurados em português. Exemplo: Cazaquistão (Kazakhstan)`}
          />
        </Box>

        {presentationMode === 'grid' ? (
          <DataGrid
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            slotProps={{
              toolbar: {
                csvOptions,
              },
            }}
            rowSelection={false}
            onRowClick={(params) =>
              navigate(`/paises/${encode(params.row.name)}`)
            }
            localeText={dataGridLocaleText}
            loading={status === 'pending'}
            pageSizeOptions={[10, 25, 50, 100]}
            slots={{ toolbar: GridToolbar, loadingOverlay: LinearProgress }}
            sx={{ maxHeight: '70vh', minHeight: '70vh' }}
            columns={dataGridColumns}
            rows={dataGridRows}
          />
        ) : (
          <CountryCards countries={countries} />
        )}
      </Box>
    </Box>
  );
};

const CountryCards: React.FC<{ countries: ICountry[] }> = ({ countries }) => {
  const navigate = useNavigate();

  return (
    <Box hCenter gap="28px" flexDirection="row" style={{ flexWrap: 'wrap' }}>
      {countries.length > 0 ? (
        countries.map((country) => (
          <Box
            key={country.name.common}
            p="0px"
            onClick={() => navigate(`/paises/${encode(country.name.common)}`)}
            borderRadius="8px"
            style={{
              textAlign: 'left',
              transition: '.1s',
              overflow: 'hidden',
              boxShadow:
                'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
              ':hover': {
                transform: 'scale(1.1)',
                boxShadow:
                  'rgba(0, 0, 0, 0.37) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
              },
            }}
            width="250px"
            backgroundColor="white"
          >
            <Box
              vCenter
              style={{
                maxHeight: '100px',
                minHeight: '100px',
                overflow: 'hidden',
                borderBottom: '1px solid black',
              }}
            >
              <img
                src={country.flags.png}
                alt={`Bandeira do país ${country.name.common}`}
              />
            </Box>
            <Box height="100%" gap="4px" p="8px">
              <Text align="center" fontFamily="Titillium Web" fontWeight="600">
                {country.name.common.toUpperCase()}
              </Text>
              <Box
                gap="12px"
                height="100%"
                style={{ justifyContent: 'space-between' }}
              >
                <CountryInfo title="Capital" text={formatCapitals(country)} />
                <CountryInfo title="Moeda" text={formatCurrencies(country)} />
                <CountryInfo title="População" text={country.population} />
                <CountryInfo title="Idioma" text={formatLanguages(country)} />
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box hCenter>
          <InfoOutlinedIcon
            style={{
              color: 'gray',
              width: '50px',
              height: '50px',
            }}
          />
          <Text color="gray" fontFamily="Titillium Web">
            Nenhum país encontrado.
          </Text>
        </Box>
      )}
    </Box>
  );
};

const CountryInfo: React.FC<{ title: string; text: string | number }> = ({
  title,
  text,
}) => {
  return (
    <Box>
      <Text fontSize="12px" letterSpacing={1.6}>
        {title}
      </Text>
      <Text fontSize="14px" letterSpacing={1}>
        {text}
      </Text>
    </Box>
  );
};

const csvOptions = {
  fileName: 'bd-paises',
  fields: ['name', 'capital', 'population', 'currencies', 'languages'],
};

const dataGridLocaleText = {
  ...ptBR.components.MuiDataGrid.defaultProps.localeText,
  columnMenuManageColumns: 'Gerenciar colunas',
};

const dataGridColumns: GridColDef[] = [
  {
    field: 'flag',
    headerName: 'Bandeira',
    sortable: false,
    width: 100,
    disableReorder: true,
    disableColumnMenu: true,
    filterable: false,
    renderCell: (params) => {
      return (
        <img
          src={params.row.flag}
          width="70%"
          alt={`Bandeira do país ${params.row.name}`}
        />
      );
    },
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 200,
  },
  {
    field: 'capital',
    headerName: 'Capital',
    width: 200,
  },
  {
    field: 'population',
    headerName: 'População',
    width: 200,
  },
  {
    field: 'currencies',
    headerName: 'Moedas',
    width: 200,
  },
  {
    field: 'languages',
    headerName: 'Idiomas',
    width: 200,
  },
];
