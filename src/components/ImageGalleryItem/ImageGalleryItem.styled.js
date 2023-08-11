import styled from 'styled-components';

export const StyledImageGalleryItem = styled.li`
  margin: 0;
  padding: 0;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
  }
`;
