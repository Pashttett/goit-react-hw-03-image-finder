import React from 'react';
import { StyledButton } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      Load more
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;