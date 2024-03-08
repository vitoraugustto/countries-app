import { useState } from 'react';

import { ICountry, Status } from '@common/types';
import {
  formatCapitals,
  formatCurrencies,
  formatLanguages,
  unaccent,
} from '@common/utils';
import { Box, Input, Text } from '@components';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, ptBR } from '@mui/x-data-grid';
import { fetchCountry } from '@services/countries';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [status, setStatus] = useState<Status>('idle');

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
    <Box gap="32px" p="2%" height="100vh">
      <Text fontWeight="600" fontFamily="Titillium Web" component="h1">
        Countries APP
      </Text>
      <Box gap="12px">
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
      </Box>
    </Box>
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
