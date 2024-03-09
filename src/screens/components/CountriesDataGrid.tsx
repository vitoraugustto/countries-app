import { useNavigate } from 'react-router-dom';

import { ICountry, Status } from '@common/types';
import {
  encode,
  formatCapitals,
  formatCurrencies,
  formatLanguages,
} from '@common/utils';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, ptBR } from '@mui/x-data-grid';

export const CountriesDataGrid: React.FC<{
  status: Status;
  countries: ICountry[];
}> = ({ countries }) => {
  const navigate = useNavigate();

  const dataGridRows = countries.map((country) => ({
    id: country.name.common,
    flag: country.flags.png,
    name: country.name.common,
    population: country.population,
    capital: formatCapitals(country),
    currencies: formatCurrencies(country),
    languages: formatLanguages(country),
  }));

  return (
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
      onRowClick={(params) => navigate(`/paises/${encode(params.row.name)}`)}
      localeText={dataGridLocaleText}
      loading={status === 'pending'}
      pageSizeOptions={[10, 25, 50, 100]}
      slots={{ toolbar: GridToolbar, loadingOverlay: LinearProgress }}
      sx={{ maxHeight: '70vh', minHeight: '70vh' }}
      columns={dataGridColumns}
      rows={dataGridRows}
    />
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
