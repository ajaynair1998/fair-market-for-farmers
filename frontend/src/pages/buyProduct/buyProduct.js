import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { Paper, Tab, Tabs, Typography, Card, Button, CardContent, CardMedia } from '@material-ui/core';
import { api } from '../../lib/api';

import './buyProduct.css'

class BuyProduct extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { product: "" }
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
            console.log(product)
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
                        </CardContent>
                    </Card>
                </div>
            </div>) : <div><h1>Loading</h1></div>
    }
}

export default withRouter(BuyProduct)