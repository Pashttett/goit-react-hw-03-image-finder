import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalLoader, Overlay } from './Modal.styled';
import Loader from '../Loader/Loader';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = e => {
    if (e.key === 'Escape' || e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <Overlay onClick={this.handleCloseModal}>
        <ModalContainer>
          <img
            src={largeImageURL}
            alt=""
          />
          <ModalLoader format={largeImageURL}>
            <Loader />
          </ModalLoader>
        </ModalContainer>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
