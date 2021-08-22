import React, { Component } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './AuthCard.css';
import { Link } from 'react-router-dom';

class AuthCard extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showPassword: false,
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    const { className, title, showPasswordReset, btnText, authFn, onAuth } =
      this.props;

    return (
      <div className={`${className}`}>
        <Card className="authCard">
          <CardContent>
            <form>
              <Typography
                className="authCard__title"
                variant="h5"
                component="h1"
              >
                {title}
              </Typography>
              <div className="authCard__inputs">
                <TextField
                  className="authCard__input"
                  label="Phone"
                  placeholder="Phone"
                  variant="outlined"
                  type="number"
                  required
                  onChange={this.handleChange('username')}
                />
                <FormControl
                  className="authCard__input"
                  variant="outlined"
                  required
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    placeholder="Password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    labelWidth={70}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {showPasswordReset && (
                  <Link to="/login" className="authCard__resetPass">
                    Forgot Password ?
                  </Link>
                )}
              </div>
              <div className="authCard__footer">
                <Button
                  className="authCard__btn"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth={true}
                  onClick={async () => {
                    try {
                      const isAuth = await authFn();
                      console.log('auth complete: ', isAuth);
                      onAuth(isAuth);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  {btnText}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default AuthCard;
