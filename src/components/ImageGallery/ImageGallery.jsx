import React from 'react';
import { StyledImageGallery, StyledImageGalleryItem } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, toggleModal }) => {
  return (
    <StyledImageGallery>
      {images.map((image) => (
        <StyledImageGalleryItem key={image.id}>
          <img
            src={image.webformatURL}
            alt=""
            onClick={() => toggleModal(image.largeImageURL)} // Додано обробник події onClick
          />
        </StyledImageGalleryItem>
      ))}
    </StyledImageGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
