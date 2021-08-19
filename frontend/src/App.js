import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom'

import './App.css';

// importing pages
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard'

function App() {
    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                          <Redirect to="/login" />
                        </Route>

                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </StylesProvider>
    );
}

export default App;
