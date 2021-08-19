import React, { Component } from "react";
import './Login.css';
import AuthCard from "../../components/AuthCard/AuthCard";
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <AuthCard title="Login" btnText="LOGIN" showPasswordReset={true} className="loginCard" />
                    <p className="signupLink">
                        Don't have an account yet ?
                        <Link to="/signup">
                            JOIN NOW !
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;


