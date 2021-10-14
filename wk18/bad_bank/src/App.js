import Header from "./components/Header";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";

const routes = [
  {
    name: "Home",
    path: "/",
    component: <HomePage />,
  },
  {
    name: "Withdraw",
    path: "/withdraw",
    component: <></>,
  },
  {
    name: "Deposit",
    path: "/deposit",
    component: <></>,
  },
  {
    name: "Create Account",
    path: "/account",
    component: <></>,
  },
  {
    name: "All Data",
    path: "/alldata",
    component: <></>,
  },
];

function App() {
  return (
    <div className="App">
      <Router>
        <Header routes={routes} />
        <Switch>
          {routes.map((route) => (
            <Route path={route.path}>{route.component}</Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
