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


import Map from '../../components/googleMap/dragableLocation'
import { api } from '../../lib/api'




class AddProduct extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      doh: new Date(),
      productImgInput: null,
      productImg: '',
      product: { image: "", activeMarker: null }
    };

    // functions
    this.handleDragPointer = this.handleDragPointer.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleImgSelect(event)
  {
    const imgFile = new FileReader();
    imgFile.readAsDataURL(event.target.files[0]);
    imgFile.onload = (event) =>
    {
      let productObject = this.state.product
      productObject.image = event.target.result


      this.setState((prevState) => 
      {
        return { ...prevState, product: productObject }
      });
    };
  }

  // pass this onto the map componant so that it can change the 
  // location value in this components state
  handleDragPointer(lat, lng)
  {

    let productObject = this.state.product
    productObject.location = JSON.stringify({ lat: lat, lng: lng })
    this.setState(prevState => 
    {
      return { ...prevState, product: productObject }
    })


  }

  // change the state whenever an input is updated
  handleChange(event)
  {

    let changedField = event.target.name
    let changedValue = event.target.value

    let productObject = this.state.product
    productObject[changedField] = changedValue

    this.setState(prevState =>
    {
      return { ...prevState, product: productObject }
    })



  }

  async handleSubmit(event)
  {
    try
    {
      console.log(this.state.product)
      let response = await api.post('/product', { product: this.state.product })
      console.log(response)
    }
    catch (err)
    {
      console.log(err)
    }
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
                name="productName"
                placeholder="Eg: Rice"
                type="text"
                variant="outlined"
                onChange={this.handleChange}
              ></TextField>
              <TextField
                label="Small Description"
                name="smallDescription"
                placeholder="Eg: The best rice you can get in India"
                type="textarea"
                variant="outlined"
                onChange={this.handleChange}
              ></TextField>
              <TextField
                name="detailedDescription"
                multiline={true}
                variant="outlined"
                minRows={8}
                label="Description"
                placeholder="Eg: Our rice is the most quality rice you can get in India"
                onChange={this.handleChange}
              />
              <TextField
                label="Stock Available"
                name='stock'
                placeholder="Eg: 100 Kg"
                type="text"
                variant="outlined"
                onChange={this.handleChange}
              />
              <TextField
                label="Price"
                name='price'
                placeholder="Eg: 120"
                type="number"
                variant="outlined"
                onChange={this.handleChange}
              />
              <div className='mapTopContainer'>
                <p>Select Location</p>
                <Map handleDragPointer={this.handleDragPointer} />
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
                    this.setState((prevState) => { return { ...prevState, doh: date } });
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
              onClick={this.handleSubmit}
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
