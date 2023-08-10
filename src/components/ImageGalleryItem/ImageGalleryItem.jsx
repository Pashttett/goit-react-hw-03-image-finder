import React from 'react';
import { StyledImageGalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, toggleModal }) => {
  return (
    <StyledImageGalleryItem onClick={() => toggleModal(largeImageURL)}>
      <img src={webformatURL} alt="" />
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
