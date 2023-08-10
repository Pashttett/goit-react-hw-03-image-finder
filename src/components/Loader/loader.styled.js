import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const StyledLoader = styled(ThreeDots)`
  display: inline-block;
  vertical-align: middle;
  margin: 0 auto;
`;
