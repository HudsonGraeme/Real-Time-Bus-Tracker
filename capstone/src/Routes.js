import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { routes } from './constants';
import Logo from './images/BankLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Routes.css';

const FourZeroFour = React.lazy(() => import('./pages/404'));

const LoadingComponent = () => (
    <div className="w-100 h-100 bg-light text-dark">
        <img src={Logo} alt="Logo" height="256px" />
        <h1 className="p-5">Loading...</h1>
    </div>
);

const Routes = () => {
    const [loadingOpacity, setLoadingOpacity] = useState(1.0);

    useEffect(() => {
        const timeout = setTimeout(() => setLoadingOpacity(0.0), 200);
    });

    const RenderSuspenseful = ({ children }) => (
        <React.Suspense fallback={<LoadingComponent />}>
            {children}
        </React.Suspense>
    );

    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    {routes.map((route) => (
                        <Route
                            key={`route-${route.name}`}
                            path={route.path}
                            exact
                        >
                            <RenderSuspenseful>
                                {route.component}
                            </RenderSuspenseful>
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
