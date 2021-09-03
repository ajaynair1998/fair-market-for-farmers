import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { StylesProvider } from '@material-ui/styles';
import { Container, createTheme } from '@material-ui/core';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

// importing pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AddProduct from './pages/AddProduct/AddProduct';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile/Profile';
import Logout from './pages/Logout/Logout';
import Home from './pages/Home/Home';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#6200EE',
      },
    },
  });
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route path="/login/">
                <Login />
              </Route>
              <Route path="/signup/">
                <Signup />
              </Route>
              <PrivateRoute exact path="/">
                <Home />
              </PrivateRoute>
              <PrivateRoute path="/products/add/">
                <AddProduct />
              </PrivateRoute>
              <PrivateRoute path="/profile/">
                <Profile />
              </PrivateRoute>
            </Switch>
          </Router>
        </Container>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
