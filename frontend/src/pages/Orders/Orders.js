import { Card, CardContent, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { getOrders } from '../../lib/orders';
import { format } from 'date-fns';
import './Orders.scss';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };

    this.fetchOrders();
  }

  async fetchOrders() {
    const orders = await getOrders();

    this.setState({
      orders: orders.transactions.sort((a, b) => {
        return new Date(a.dateOfTransaction) < new Date(b.dateOfTransaction)
          ? 1
          : -1;
      }),
    });

    console.log('orders: ', this.state.orders);
  }

  render() {
    return (
      <div className="ordersPage">
        <Typography variant="h4" component="h1">
          Orders
        </Typography>
        <div className="ordersList">
          {this.state.orders.map((order) => {
            return (
              <Card
                key={order._id}
                className="ordersListItem"
                variant="outlined"
              >
                <CardContent>
                  <h2 className="ordersListItem__name">{order.productName}</h2>
                  <p className="ordersListItem__id"># {order._id}</p>
                  <p>Quantity: {order.stockBought}</p>
                  <div className="ordersListItem__footer">
                    <div aria-label="order date">
                      <span>Date: </span>
                      {format(new Date(order.dateOfTransaction), 'dd-MM-yyyy')}
                    </div>
                    <p className="ordersListItem__price">Rs. {Number(order.price) * Number(order.stockBought)}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Orders;
