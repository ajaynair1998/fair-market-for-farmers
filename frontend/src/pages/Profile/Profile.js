import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  styled,
  TextField,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './Profile.css';

const StyledAvatar = styled(Avatar)({
  width: '150px',
  height: '150px',
  position: 'relative',
  zIndex: 10,
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dob: null,
    };
  }

  render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid container item xs={12} direction="row" justifyContent="center">
            <StyledAvatar />
            <div className="profileCoverBg"></div>
          </Grid>
        </Grid>

        <form className="profileForm">
          <TextField fullWidth variant="outlined" label="Name" />
          <FormControl
            fullWidth
            className="profileFormcontrol"
            component="fieldset"
          >
            <FormLabel component="legend">Who are you ?</FormLabel>
            <RadioGroup row aria-label="role" name="role">
              <FormControlLabel
                value="farmer"
                control={<Radio />}
                label="Farmer"
              />
              <FormControlLabel
                value="buyer"
                control={<Radio />}
                label="Buyer"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            className="profileFormcontrol"
            label="Phone Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91 </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              className="profileFormcontrol"
              inputVariant="outlined"
              id="doh-picker"
              label="Date Of Birth"
              format="dd/MM/yyyy"
              value={this.state.dob}
              onChange={(date) => {
                this.setState({ dob: date });
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <Button
            className="profileFormcontrol"
            size="large"
            color="primary"
            variant="contained"
            fullWidth
          >
            Save Profile
          </Button>
        </form>
      </>
    );
  }
}

export default Profile;
