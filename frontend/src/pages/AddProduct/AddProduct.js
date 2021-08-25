import React, { Component } from 'react';
import
  {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
  } from '@material-ui/core';
import
  {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './AddProduct.css';

// import google map
import Map from '../../components/googleMap/dragableLocation'

class AddProduct extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      doh: new Date(),
      productImgInput: null,
      productImg: '',
    };
  }

  handleImgSelect(event)
  {
    const imgFile = new FileReader();
    imgFile.readAsDataURL(event.target.files[0]);
    imgFile.onload = (event) =>
    {
      this.setState({ productImg: event.target.result });
    };
  }

  render()
  {
    const { className } = this.props;

    return (
      <div className={`addProductPage ${className}`}>
        <Card>
          <CardContent>
            <form className="productInps">
              <Typography variant="h5" component="h1">
                Add New Product
              </Typography>
              <div className="imgPicker">
                <p>Upload an image for the product</p>
                <input
                  className="imgPicker__input sr-only"
                  type="file"
                  accept="image/*"
                  name="productImg"
                  id="productImg"
                  onInput={(event) => this.handleImgSelect(event)}
                />
                <label className="imgPicker__label" htmlFor="productImg">
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    component="span"
                  >
                    Upload
                  </Button>
                  {this.state.productImg && (
                    <img
                      className="imgPicker__preview"
                      src={this.state.productImg}
                      alt="Product"
                    />
                  )}
                </label>
              </div>
              <TextField
                label="Product Name"
                placeholder="Eg: Rice"
                type="text"
                variant="outlined"
              ></TextField>
              <TextField
                label="Small Description"
                placeholder="Eg: The best rice you can get in India"
                type="textarea"
                variant="outlined"
              ></TextField>
              <TextField
                multiline={true}
                variant="outlined"
                minRows={8}
                label="Description"
                placeholder="Eg: Our rice is the most quality rice you can get in India"
              />
              <TextField
                label="Stock Available"
                placeholder="Eg: 100 Kg"
                type="text"
                variant="outlined"
              />
              <TextField
                label="Price"
                placeholder="Eg: 120"
                type="number"
                variant="outlined"
              />
              <div className='mapTopContainer'>
                <p>Select Location</p>
                <Map />
                </div>


              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  inputVariant="outlined"
                  id="doh-picker"
                  label="Date Of Harvest"
                  format="dd/MM/yyyy"
                  value={this.state.doh}
                  onChange={(date) =>
                  {
                    this.setState({ doh: date });
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </form>
          </CardContent>
          <CardActions>
            <Button
              size="large"
              className="addProdBtn"
              variant="contained"
              color="primary"
            >
              Add Product
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default AddProduct;
