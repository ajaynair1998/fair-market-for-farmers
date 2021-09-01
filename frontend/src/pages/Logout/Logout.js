import { Component } from 'react';
import { signout } from '../../lib/auth';

class Logout extends Component {
  constructor(props) {
    super(props);
    signout();
    window.location.assign('/');
  }

  render() {
    return <>Logging you out !</>;
  }
}

export default Logout;
