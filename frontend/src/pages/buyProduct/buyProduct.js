import React, { Component } from 'react'
import { withRouter } from 'react-router';
import
{
    Paper, Tab, Tabs, Typography, Card, Button, CardContent, CardMedia,
    Grid, Slider
} from '@material-ui/core';
import { api } from '../../lib/api';

import './buyProduct.css'

class BuyProduct extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { product: "", selectedStock: 0 }

        // custom
        this.handleChangeSlider = this.handleChangeSlider.bind(this)
    }

    async componentDidMount()
    {
        try
        {
            // for production
            let currentProductId = this.props.match.params.id

            // debug
            currentProductId = "612db0a048220aaf9f657e5a"
            let response = await api.post('/productDetails', { "productId": currentProductId })


            let product = response.data.product
            // console.log(product)
            this.setState(prevState =>
            {
                return { ...prevState, product: product }
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

    render()
    {
        return this.state.product ?
            (<div id='buyProduct'>
                <div className="buyProduct_content">
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h1">
                                {this.state.product.productName}
                            </Typography>

                            <CardMedia
                                className="productCard__img"
                                image={this.state.product.image}
                                title={`Product image of ${this.state.product.image.toLowerCase()}`}
                            />

                            <Grid container spacing={3} justifyContent="space-between"
                                className="price_and_stock">
                                <Grid item xs={3} sm={2}>
                                    <Typography variant="p" >
                                        Stock <b>{this.state.product.stock}</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Typography variant="p1" >
                                        Price <b>{this.state.product.price}</b>
                                    </Typography>
                                </Grid>

                            </Grid>

                            <div className="slider_label">
                                <Typography variant="p1" >
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
                                        Add To Cart
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Button variant="outlined" color="primary" className="button_buy_product">
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