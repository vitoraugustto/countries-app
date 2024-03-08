import {
  Route,
  BrowserRouter as Router,
  Routes as _Routes,
} from 'react-router-dom';

import { CountriesScreen } from '@screens/CountriesScreen';

export const Routes = () => {
  return (
    <Router>
      <_Routes>
        <Route path="/" element={<CountriesScreen />} />
      </_Routes>
    </Router>
  );
};
