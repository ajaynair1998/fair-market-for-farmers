import React, { Component } from 'react';
import './Login.css';
import AuthCard from '../../components/AuthCard/AuthCard';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth';

class Login extends Component {
  /**
   * why pass props to super ? I just found about this on
   * https://overreacted.io/why-do-we-write-super-props/
   */
  constructor(props) {
    super(props);
    this.state = {};

    // bind this.history so that this can be used in
    // child components
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth() {
    this.props.history.push('/products/add/');
  }

  render() {
    return isAuthenticated() ? (
      <Redirect to="/products/add/" />
    ) : (
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

export default withRouter(Login);
