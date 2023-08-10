import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchbar,
  StyledForm,
  StyledInput,
  StyledSearchButton,
  StyledErrorMessage,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
    showError: false,
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value, showError: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      this.setState({ showError: true });
      return;
    }

    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <StyledSearchbar>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <StyledSearchButton type="submit">
            <span className="button-label">Search</span>
          </StyledSearchButton>
        </StyledForm>
        {this.state.showError && (
          <StyledErrorMessage>
            Please enter a search query
          </StyledErrorMessage>
        )}
      </StyledSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
