import {createTheme, StylesProvider, ThemeProvider} from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";


const theme = createTheme({
    palette: {
        primary: {
            main: '#6200EE'
        }
    }
});

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
