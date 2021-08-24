import React, { Component } from 'react';
import './Signup.css';
import AuthCard from '../../components/AuthCard/AuthCard';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAuth() {
    window.location.assign('/products/add/');
  }

  render() {
    return (
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

export default Signup;
