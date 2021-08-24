import React, { Component } from 'react';
import './Login.css';
import AuthCard from '../../components/AuthCard/AuthCard';
import { Link } from 'react-router-dom';

class Login extends Component {
  /**
   * why pass props to super ? I just found about this on
   * https://overreacted.io/why-do-we-write-super-props/
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAuth() {
    window.location.assign('/products/add/');
  }

  render() {
    return (
      <div className="loginPage">
        <AuthCard
          title="Login"
          btnText="LOGIN"
          showPasswordReset={true}
          className="loginCard"
          authMode="signin"
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
