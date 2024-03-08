import { useState } from 'react';

import { ICountry, Status } from '@common/types';
import {
  formatCapitals,
  formatCurrencies,
  formatLanguages,
  unaccent,
} from '@common/utils';
import { Box, Button, Input, Text } from '@components';
import { LinearProgress, ThemeProvider } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, ptBR } from '@mui/x-data-grid';
import { fetchCountry } from '@services/countries';

import { defaultTheme } from './theme';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [presentationMode, setPresentationMode] = useState<'grid' | 'card'>(
    'grid',
  );

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
    <ThemeProvider theme={defaultTheme}>
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
          <Box flexDirection="row" gap="12px">
            <Input
              debouncedValue={(debouncedValue) => {
                if (!debouncedValue) return;
                handleFetchCountry(debouncedValue);
              }}
              endAdornment
              fullWidth
              label="Nome do país"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
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
              onRowClick={(params) => console.log(params)}
              localeText={dataGridLocaleText}
              loading={status === 'pending'}
              pageSizeOptions={[10, 25, 50, 100]}
              slots={{ toolbar: GridToolbar, loadingOverlay: LinearProgress }}
              sx={{ maxHeight: '70vh', minHeight: '70vh' }}
              columns={dataGridColumns}
              rows={dataGridRows}
            />
          ) : (
            <Box
              gap="28px"
              hCenter
              flexDirection="row"
              style={{ flexWrap: 'wrap' }}
            >
              {countries.map((country) => (
                <Box
                  p="0px"
                  onClick={() => console.log(country)}
                  borderRadius="8px"
                  style={{
                    textAlign: 'left',
                    transition: '.1s',
                    overflow: 'hidden',
                    boxShadow:
                      'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
                    ':hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                  width="200px"
                  height="250px"
                  backgroundColor="white"
                >
                  <Box
                    vCenter
                    style={{
                      maxHeight: '100px',
                      overflow: 'hidden',
                      borderBottom: '1px solid black',
                    }}
                  >
                    <img
                      src={country.flags.png}
                      alt={`Bandeira do país ${country.name.common}`}
                    />
                  </Box>
                  <Box p="4px">
                    <Text
                      align="center"
                      fontFamily="Titillium Web"
                      fontSize="18px"
                      fontWeight="600"
                    >
                      {country.name.common.toUpperCase()}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

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

export default App;
