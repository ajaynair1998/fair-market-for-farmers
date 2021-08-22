import React, { Component } from 'react';
import './Login.css';
import AuthCard from '../../components/AuthCard/AuthCard';
import { Link } from 'react-router-dom';
class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleAuth() {
    window.location.assign('/products/add/');
  }

  authFn() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  render() {
    return (
      <div className="loginPage">
        <AuthCard
          title="Login"
          btnText="LOGIN"
          showPasswordReset={true}
          className="loginCard"
          authFn={this.authFn}
          onAuth={this.handleAuth}
        />
        <p className="signupLink">
          Don't have an account yet ?<Link to="/signup">JOIN NOW !</Link>
        </p>
      </div>
    );
  }
}

export default Login;
