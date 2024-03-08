import { useState } from 'react';

import { ICountry, Status } from '@common/types';
import { Box, Button, Input } from '@components';
import { DataGrid, GridColDef, GridToolbar, ptBR } from '@mui/x-data-grid';
import { fetchCountry } from '@services/countries';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [status, setStatus] = useState<Status>('idle');

  const dataGridRows = countries.map((country) => {
    return {
      id: country.name.common,
      flag: country.flags.png,
      name: country.name.common,
      capital: formatCapitals(country),
      currencies: formatCurrencies(country),
      languages: formatLanguages(country),
    };
  });

  const handleFetchCountry = () => {
    setStatus('pending');

    fetchCountry(countryName)
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
            fullWidth
            label="Digite o nome do país"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
          <Button
            minWidth="130px"
            disabled={status === 'pending'}
            fullWidth={false}
            onClick={handleFetchCountry}
            text="Buscar"
          />
        </Box>
        <DataGrid
          localeText={dataGridLocaleText}
          loading={status === 'pending'}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          autoHeight={countries.length === 0 ? true : false}
          slots={{ toolbar: GridToolbar }}
          sx={{ maxHeight: '85vh' }}
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

const formatCapitals = (country: ICountry) => {
  if (country.capital?.length > 0) {
    return country.capital.join(', ');
  } else {
    return 'N/A';
  }
};

const formatCurrencies = (country: ICountry) => {
  if (country.currencies) {
    return Object.keys(country.currencies)
      .map(
        (key) =>
          country.currencies[key].name + ` (${country.currencies[key].symbol})`,
      )
      .join(', ');
  } else {
    return 'N/A';
  }
};

const formatLanguages = (country: ICountry) => {
  if (country.languages) {
    return Object.values(country.languages).join(', ');
  } else {
    return 'N/A';
  }
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
