import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import Create from './components/Create';
import Dashboard from './components/Dashboard';
import EditUser from './components/EditUser';
import Login from './components/Login';
import Signup from './components/Signup';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />
  // }

  function PrivateRoute({ component: Component, ...rest }) {
    console.log("token",token);
    return (
      <Route
        {...rest}
        // render={() => <Redirect to={{ pathname: '/login' }} />}
        render={(props) => token
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login' }} />}
      />
    )
  }

  function AuthRoute({ component: Component, ...rest }) {
    console.log("rest",rest);
    return (
      <Route
        {...rest}
        // render={() => <Redirect to={{ pathname: '/login' }} />}
        render={(props) => !token
          ? <Component {...rest} {...props} />
          : <Redirect to={{ pathname: '/' }} />}
      />
    )
  }

  return (
    <div className="wrapper">
      {/* <h1>Application</h1> */}
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/signup'}>Sign Up</Link>
            </li>
          </ul>
          <Switch>
            {/* <Route exact path='/login'>
              <Login setToken={setToken} />
            </Route> */}
            <AuthRoute exact path='/login' component={Login} setToken={setToken}></AuthRoute>
            <AuthRoute exact path='/signup' component={Signup}></AuthRoute>
            <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
            <PrivateRoute exact path="/edit/:id" component={EditUser}></PrivateRoute>
            <PrivateRoute exact path="/create" component={Create}></PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;