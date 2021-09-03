import React, { Component } from 'react';
import './Home.css';
import dashboardCover from '../../assets/img/dashboardCover.png';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard__cover"></div>
      </div>
    );
  }
}

export default Home;
