import React, { Component } from "react";
import './Signup.css';
import AuthCard from "../../components/AuthCard/AuthCard";
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="signupPage">
                <div className="container">
                    <AuthCard title="sign up" btnText="sign up" className="signupCard" />
                    <p className="signupLink">
                        Have an account ?
                        <Link to="/login">
                            LOGIN NOW !
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Signup;


