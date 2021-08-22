import React, { Component } from 'react';
import './Signup.css';
import AuthCard from '../../components/AuthCard/AuthCard';
import { Link } from 'react-router-dom';
import { signup } from '../../lib/auth';
import { testVar } from '../../lib/auth';

class Signup extends Component {
  constructor() {
    super();
    this.state = {};
    console.log('test var: ', testVar);
  }

  render() {
    return (
      <div className="signupPage">
        <AuthCard
          title="sign up"
          btnText="sign up"
          className="signupCard"
          authFn={() => signup('test' + Math.random(), 'test')}
          onAuth={(res) => {
            console.log('auth request: ', res);
          }}
        />
        <p className="signupLink">
          Have an account ?<Link to="/login">LOGIN NOW !</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
