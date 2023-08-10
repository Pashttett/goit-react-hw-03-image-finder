import styled from 'styled-components';

export const StyledImageGallery = styled.ul`
  list-style: none;
  display: grid;
  gap: 10px;
  padding: 20px;
  margin: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  @media (min-width: 1201px) {
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  }
`;

export const StyledImageGalleryItem = styled.li`
  margin: 0;
  padding: 0;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
