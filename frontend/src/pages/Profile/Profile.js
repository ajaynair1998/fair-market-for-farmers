import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import { editProfile, getProfile } from '../../lib/profile';
import * as Yup from 'yup';
import { Formik } from 'formik';

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
      form: {
        dob: new Date(),
        role: '',
        userName: '',
        mobileNumber: '',
      },
    };

    // this is the validation schema for the profile form
    // see https://www.npmjs.com/package/yup for learning how this works
    this.validationSchema = Yup.object({
      userName: Yup.string().required('Username is required'),
      mobileNumber: Yup.string()
        .matches(/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
          message: 'Please enter a valid mobile number',
        })
        .length(10)
        .required('Your mobile number is required'),
      dob: Yup.date().max(new Date()).required('Date of birth is required'),
      role: Yup.mixed()
        .oneOf(['farmer', 'buyer'])
        .required('Your role is required'),
    });

    this.initForm();
  }

  async initForm() {
    const res = await getProfile();

    if (res.success) {
      this.setState({
        form: {
          ...res.details,
          dob: res.details.DOB,
        },
      });
      console.log(
        'profile: ',
        this.state.form,
        this.validationSchema.isValidSync()
      );
    }
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
        <Formik
          enableReinitialize={true}
          initialValues={this.state.form}
          validationSchema={this.validationSchema}
          validateOnBlur={true}
          validateOnMount={true}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await editProfile({
              ...values,
              DOB: values.dob,
            });

            console.log('form subed: ', res);

            // update the state and reset the form touched status
            setSubmitting(false);
            this.setState({
              form: values,
            });
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            isValid,
            touched,
            isSubmitting,
            setFieldValue,
            setTouched,
          }) => (
            <form className="profileForm" onSubmit={handleSubmit}>
              <TextField
                name="userName"
                fullWidth
                variant="outlined"
                label="Username"
                error={touched.userName && errors.userName && true}
                helperText={touched.userName && errors.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
              />
              <FormControl
                fullWidth
                className="profileFormcontrol"
                component="fieldset"
                error={touched.role && errors.role && true}
              >
                <FormLabel component="legend">Who are you ?</FormLabel>
                <RadioGroup
                  row
                  aria-label="role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
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
                <FormHelperText>{touched.role && errors.role}</FormHelperText>
              </FormControl>
              <TextField
                name="mobileNumber"
                fullWidth
                className="profileFormcontrol"
                label="Mobile Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91 </InputAdornment>
                  ),
                }}
                variant="outlined"
                value={values.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mobileNumber && errors.mobileNumber && true}
                helperText={touched.mobileNumber && errors.mobileNumber}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="dob"
                  fullWidth
                  className="profileFormcontrol"
                  inputVariant="outlined"
                  id="doh-picker"
                  label="Date Of Birth"
                  format="dd/MM/yyyy"
                  value={values.dob}
                  onChange={(date) => {
                    setFieldValue('dob', date);
                    setTouched({ dob: true });
                  }}
                  onBlur={handleBlur}
                  error={touched.dob && errors.dob && true}
                  helperText={touched.dob && errors.dob}
                  KeyboardButtonProps={{
                    'aria-label': 'change date of birth',
                  }}
                  maxDate={new Date()}
                />
              </MuiPickersUtilsProvider>
              <Button
                className="profileFormcontrol"
                size="large"
                color="primary"
                variant="contained"
                type="submit"
                disabled={
                  !isValid || Object.keys(touched).length < 1 || isSubmitting
                }
                fullWidth
              >
                Save Profile
              </Button>
            </form>
          )}
        </Formik>
      </>
    );
  }
}

export default Profile;
