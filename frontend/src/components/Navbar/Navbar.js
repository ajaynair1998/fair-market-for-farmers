import React, { Component } from 'react';
import {
  AppBar,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import styles from './styles.navbar';
import { withStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Drawer } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

class StyledAppbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      drawerItems: [
        {
          label: 'Home',
          href: '/',
        },
        {
          label: 'Profile',
          href: '/profile/',
        },
        {
          label: 'Products',
          href: '/products/',
        },
        {
          label: 'Orders',
          href: '/orders/',
        },
      ],
    };
  }
  render() {
    const { classes, history } = this.props;
    console.log(this.props);
    return (
      <>
        <AppBar className={classes.navbar} position="fixed" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() =>
                this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
              }
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow}></div>
            <Link to="/profile/">
              <Avatar className={classes.avatar} alt="Profile picture">
                <AccountCircleIcon />
              </Avatar>
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          anchor="bottom"
          open={this.state.isDrawerOpen}
          onClose={() => this.setState({ isDrawerOpen: false })}
        >
          <div className={classes.drawerContent}>
            <List>
              {this.state.drawerItems.map((item) => {
                return (
                  <ListItem
                    key={item.href}
                    button
                    component="a"
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ isDrawerOpen: false });
                      history.push(item.href);
                    }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Drawer>
      </>
    );
  }
}

const Navbar = withStyles(styles)(withRouter(StyledAppbar));

export default Navbar;
