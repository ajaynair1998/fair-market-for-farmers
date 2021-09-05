import React, { Component } from 'react';
import './Home.css';
// @ts-ignore
import dashboardCover from '../../assets/img/dashboardCover.png';
import { Paper, Tab, Tabs, Typography } from '@material-ui/core';
import Searchbar from '../../components/Searchbar/Searchbar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { api } from '../../lib/api';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      loading: true,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(_, newValue) {
    this.setState({ activeTab: newValue });
  }

  async componentDidMount() {
    try {
      let response = await api.get('/dashboard');
      console.log('dashboard: ', response);
      this.setState(() => {
        return { loading: false, products: response.data.dashBoardProducts };
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return !this.state.loading ? (
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
                this.state.products.map((product) => (
                  <ProductCard
                    key={product._id}
                    className="itemsList__item"
                    {...product}
                  />
                ))}
            </div>
          </Paper>
        </div>
        <div className="dashboard__cover"></div>
      </div>
    ) : (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
}

export default Home;
