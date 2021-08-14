import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import './App.css';

// importing pages
import Register from './components/register'

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
        
      </Switch>
    </Router>
  );
}

export default App;
