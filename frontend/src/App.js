import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom'

import './App.css';

// importing pages
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard'

function App() {
  return (
    <Router>
      <Switch>
        
        {/* <Route exact path='/'>
          <Home />
        </Route> */}

        <Route path='/register'>
          <Register />
        </Route>

        <Route exact path='/'
          render = {routeProps => <Login {...routeProps}/>}
        />

        <Route path='/dashboard'
          render = {routeProps => <Dashboard {...routeProps}/>}
        />
        
      </Switch>
    </Router>
  );
}

export default App;
