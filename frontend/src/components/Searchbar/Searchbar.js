import React from 'react';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Component } from 'react';
import './Searchbar.css';

class Searchbar extends Component {
  render() {
    return (
      <Paper
        className="searchForm"
        component="form"
        onSubmit={(event) => event.preventDefault()}
      >
        <InputBase
          className="searchForm__input"
          placeholder="Search products, farmers and markets"
          inputProps={{
            'aria-label': 'search products, farmers and markets',
          }}
        />
        <IconButton type="submit" aria-label="search">
          <Search />
        </IconButton>
      </Paper>
    );
  }
}

export default Searchbar;
