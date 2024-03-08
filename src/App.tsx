import { useState } from 'react';

import { ICountry, Status } from '@common/types';
import {
  formatCapitals,
  formatCurrencies,
  formatLanguages,
  unaccent,
} from '@common/utils';
import { Box, Input } from '@components';
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
    <Box hCenter vCenter height="100vh" gap="22px">
      <Box gap="12px" width="90%">
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
          rowSelection={false}
          localeText={dataGridLocaleText}
          loading={status === 'pending'}
          pageSizeOptions={[10, 25, 50, 100]}
          autoHeight={countries.length === 0 ? true : false}
          slots={{ toolbar: GridToolbar, loadingOverlay: LinearProgress }}
          sx={{ maxHeight: '80vh' }}
          columns={dataGridColumns}
          rows={dataGridRows}
        />
      </Box>
    </Box>
  );
}

const dataGridLocaleText = {
  ...ptBR.components.MuiDataGrid.defaultProps.localeText,
  columnMenuManageColumns: 'Gerenciar colunas',
};

const dataGridColumns: GridColDef[] = [
  {
    field: 'flags',
    headerName: 'Bandeira',
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
