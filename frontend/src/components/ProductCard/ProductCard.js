import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { LocationOn } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './ProductCard.css';

class ProductCard extends Component {
  render() {
    const { name, img, price, location, className, id } = this.props;

    return (
      <div className="productCardComp">
        <Link to={`/products/${id}`}>
          <Card className={`productCard ${className}`} variant="outlined">
            <CardMedia
              className="productCard__img"
              image={img}
              title={`Product image of ${name.toLowerCase()}`}
            />
            <CardContent className="productCard__content">
              <Typography
                variant="overline"
                component="div"
                className="productCard__location"
              >
                <LocationOn />
                <span>{location}</span>
              </Typography>
              <Typography
                className="productCard__name"
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
