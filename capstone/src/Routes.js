import Header from './components/Header';
import Footer from './components/Footer';
import React, { useContext } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { routes } from './constants';
import { UserContext } from './services/UserContext';
import isEqual from 'lodash/isEqual';
import Logo from './images/BankLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Routes.css';
import { Redirect } from 'react-router-dom';

const FourZeroFour = React.lazy(() => import('./pages/404'));

const LoadingComponent = () => (
  <div className="w-100 h-100 bg-light text-dark">
    <img src={Logo} alt="Logo" height="256px" />
    <h1 className="p-5">Loading...</h1>
  </div>
);

const Routes = () => {
  const { userExists } = useContext(UserContext);
  const RenderSuspenseful = ({ children }) => (
    <React.Suspense fallback={<LoadingComponent />}>{children}</React.Suspense>
  );

  return (
    <div className="App">
      <Router basename="/">
        <Header />
        <Switch>
          {Object.values(routes).map((route) => (
            <Route key={`route-${route.name}`} path={route.path} exact>
              {!route.walled ||
              (userExists() &&
                !isEqual(route, routes.create_account) &&
                !isEqual(route, routes.login)) ? (
                <RenderSuspenseful>{route.component}</RenderSuspenseful>
              ) : (
                <Redirect to={userExists() ? '/data' : '/login'} />
              )}
            </Route>
          ))}

          <Route>
            <RenderSuspenseful>
              <FourZeroFour />
            </RenderSuspenseful>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default Routes;
