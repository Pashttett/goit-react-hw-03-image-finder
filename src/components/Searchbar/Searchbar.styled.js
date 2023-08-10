import styled from 'styled-components';

export const StyledSearchbar = styled.header`
  background-color:#2b3f31;
  padding: 10px 0;
  text-align: center;
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled.input`
  padding: 10px;
  border: 2px solid #006400;
  border-radius: 8px;
  font-size: 16px;
  width: 300px;
  outline: none;
`;

export const StyledSearchButton = styled.button`
  background-color: #006400; 
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-left: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004d00; 
  }
`;

export const StyledErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
