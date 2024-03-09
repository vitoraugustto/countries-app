import { useNavigate } from 'react-router-dom';

import { ICountry } from '@common/types';
import {
  encode,
  formatCapitals,
  formatCurrencies,
  formatLanguages,
} from '@common/utils';
import { Box, Text } from '@components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const CountryCards: React.FC<{ countries: ICountry[] }> = ({
  countries,
}) => {
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
