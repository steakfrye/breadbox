import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { clearProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import { setCurrentUser, logoutUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/layout/Footer';
import Landing from './components/Landing';
import Login from './components/signin/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import Profile from './components/profile/Profile';
import Recipe from './components/recipes/Recipe';
import Recipes from './components/recipes/Recipes';
import Register from './components/signin/Register';

import './App.css';
import store from './store';

// Check for token
if(localStorage.jwtToken) {
  // Set auth token to header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/recipes" component={Recipes} />
                <PrivateRoute exact path="/newrecipe" component={Recipe} />
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
