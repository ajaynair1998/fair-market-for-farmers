import React, { Component } from 'react'
import { withRouter } from 'react-router';
import
{
    Typography, Card, Button, CardContent, CardMedia,
    Grid, Slider
} from '@material-ui/core';
import { api } from '../../lib/api';
import './buyProduct.css'


class BuyProduct extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { product: "", selectedStock: 0, loading: true }

        // custom
        this.handleChangeSlider = this.handleChangeSlider.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount()
    {
        try
        {
            // for production
            let currentProductId = this.props.match.params.id

            // debug
            // currentProductId = "612db0a048220aaf9f657e5a"
            let response = await api.post('/productDetails', { "productId": currentProductId })


            let product = response.data.product
            console.log(product)
            this.setState(prevState =>
            {
                return { ...prevState, product: product, loading: false }
            })

        }
        catch (err)
        {
            console.log(err)
        }


    }

    handleChangeSlider(e, value)
    {
        let changedValue = value
        // console.log(this.state)
        this.setState(prevState =>
        {
            return { ...prevState, selectedStock: changedValue }
        })
    }

    async handleSubmit()
    {
        try
        {
            if (this.state.selectedStock === 0) 
            {
                // skip
            }
            else
            {
                this.setState(prevState => { return { ...prevState, loading: true } })
                let requestObject = { stock: this.state.selectedStock, product: this.state.product }
                let response = await api.post('/buy', requestObject)
                // console.log(response)
                this.setState(prevState => { return { ...prevState, loading: false } })



            }
        }
        catch (err)
        {
            console.log(err)
        }
    }

    render()
    {
        return !this.state.loading ?
            (<div id='buyProduct'>
                <div className="buyProduct_content">
                    <Card>
                        <CardContent>

                            <Typography variant="body1" className="product_small_description">
                                {this.state.product.smallDescription}
                            </Typography>

                            <CardMedia
                                className="productCard__img"
                                image={this.state.product.image}
                                title={`Product image of ${this.state.product.productName.toLowerCase()}`}
                            />
                            <Grid container spacing={3} justifyContent="space-between"
                                className="name_and_stock">
                                <Grid item xs={3} sm={2}>
                                    <Typography variant="body1" className="product_name" >
                                        {this.state.product.productName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Typography variant="body1" >
                                        Stock <b>{this.state.product.stock}</b>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <div className="description_container">
                                <Typography variant="body1" className="product_description give_shade">
                                    {this.state.product.detailedDescription}
                                </Typography>

                            </div>
                            <div className="price_container">
                                <Typography variant="h6" >
                                    Rs <b>{this.state.product.price}</b> / quintal
                                </Typography>
                            </div>



                            <div className="slider_label give_shade">
                                <Typography variant="body1" >
                                    Select Amount
                                </Typography>
                            </div>


                            <Slider
                                defaultValue={0}
                                value={this.state.selectedStock}
                                onDragStop={this.handleChangeSlider}
                                onChange={this.handleChangeSlider}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={this.state.product.stock}


                            />

                            <Grid container spacing={3} justifyContent="space-between"
                                className="cart_and_buy">
                                <Grid item xs={6} sm={6}>
                                    <Button variant="outlined" color="secondary" className="button_buy_product">
                                        Contact
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Button variant="contained" color="primary" className="button_buy_product"
                                        onClick={this.handleSubmit}>
                                        Buy Now
                                    </Button>
                                </Grid>

                            </Grid>



                        </CardContent>
                    </Card>
                </div>
            </div>) : <div><h1>Loading</h1></div>
    }
}

export default withRouter(BuyProduct)