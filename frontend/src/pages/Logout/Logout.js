import { Component } from 'react';
import { signout } from '../../lib/auth';
import {withRouter} from 'react-router-dom';

class Logout extends Component {
  constructor(props) {
    super(props);
    signout();
    props.history.push('/');
  }

  render() {
    return <>Logging you out !</>;
  }
}

export default withRouter(Logout);
