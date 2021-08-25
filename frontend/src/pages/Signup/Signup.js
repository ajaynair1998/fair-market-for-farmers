import React, { Component } from 'react';
import './Signup.css';
import AuthCard from '../../components/AuthCard/AuthCard';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // bind this to the function so that it can
    // used in other components https://reeversedev.com/this-and-bind-in-javascript
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth() {
    this.props.history.push('/products/add/');
  }

  render() {
    return isAuthenticated() ? (
      <Redirect to="/products/add/" />
    ) : (
      <div className="signupPage">
        <AuthCard
          title="sign up"
          btnText="sign up"
          className="signupCard"
          authMode="signup"
          onAuth={this.handleAuth}
        />
        <p className="signupLink">
          Have an account ?<Link to="/login">LOGIN NOW !</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Signup);
