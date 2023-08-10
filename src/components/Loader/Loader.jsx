import React from 'react';
import { LoaderContainer, StyledLoader as StyledLoaderComponent } from './loader.styled';

const Loader = () => {
  return (
    <LoaderContainer>
      <StyledLoaderComponent type="ThreeDots" color="#00BFFF" height={40} width={40} />
    </LoaderContainer>
  );
};

export default Loader;
