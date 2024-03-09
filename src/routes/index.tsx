import {
  Route,
  BrowserRouter as Router,
  Routes as _Routes,
} from 'react-router-dom';

import { CountriesScreen } from '@screens/CountriesScreen';
import { CountryScreen } from '@screens/CountryScreen';

export const Routes = () => {
  return (
    <Router>
      <_Routes>
        <Route path="/paises" element={<CountriesScreen />} />
        <Route path="/paises/:countryName" element={<CountryScreen />} />
      </_Routes>
    </Router>
  );
};
