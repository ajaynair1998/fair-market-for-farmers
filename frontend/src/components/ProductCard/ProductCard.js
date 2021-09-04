import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { LocationOn } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './ProductCard.css';

class ProductCard extends Component {
  render() {
    const { name, img, price, location, className, id } = this.props;

    return (
      <div className="productCardCompComp">
        <Link to={`/products/${id}`}>
          <Card className={`productCardComp ${className}`} variant="outlined">
            <CardMedia
              className="productCardComp__img"
              image={img}
              title={`Product image of ${name.toLowerCase()}`}
            />
            <CardContent className="productCardComp__content">
              <Typography
                variant="overline"
                component="div"
                className="productCardComp__location"
              >
                <LocationOn />
                <span>{location}</span>
              </Typography>
              <Typography
                className="productCardComp__name"
                variant="h6"
                component="p"
              >
                {name}
              </Typography>
              <Typography variant="h4" component="div" className="price">
                <span className="price__currency">Rs. </span>
                <span className="price__value">{price}</span>
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
