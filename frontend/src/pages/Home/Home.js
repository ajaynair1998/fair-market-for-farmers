import React, { Component } from 'react';
import './Home.css';
// @ts-ignore
import dashboardCover from '../../assets/img/dashboardCover.png';
import { Paper, Tab, Tabs, Typography } from '@material-ui/core';
import Searchbar from '../../components/Searchbar/Searchbar';
import ProductCard from '../../components/ProductCard/ProductCard';

const products = [
  {
    id: 12,
    name: 'Lorem Ipsum',
    location: 'Kerala, India',
    img: dashboardCover,
    price: 50,
    doh: new Date(),
  },
  {
    id: 45,
    name: 'Lorem Ipsum',
    location: 'Kerala, India',
    img: dashboardCover,
    price: 50,
    doh: new Date(),
  },
  {
    id: 34,
    name: 'Lorem Ipsum',
    location: 'Kerala, India',
    img: dashboardCover,
    price: 50,
    doh: new Date(),
  },
  {
    id: 76,
    name: 'Lorem Ipsum',
    location: 'Kerala, India',
    img: dashboardCover,
    price: 50,
    doh: new Date(),
  },
];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(_, newValue) {
    this.setState({ activeTab: newValue });
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard__content">
          <Typography className="dashboard__title" variant="h6" component="h1">
            Search for farmers, products and markets
          </Typography>
          <Searchbar />
          <Paper className="itemsList" elevation={3}>
            <Tabs
              value={this.state.activeTab}
              onChange={this.handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              variant="fullWidth"
              centered
            >
              <Tab label="Products" />
              <Tab label="Farmers" />
              <Tab label="Markets" />
            </Tabs>
            <div className="itemsList__items">
              {this.state.activeTab === 0 &&
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    className="itemsList__item"
                    {...product}
                  />
                ))}
            </div>
          </Paper>
        </div>
        <div className="dashboard__cover"></div>
      </div>
    );
  }
}

export default Home;
