 import styled, { keyframes }  from 'styled-components'

 const rotate = keyframes`
 from {
     transform: rotate(0deg);
 }

 to {
 transform: rotate(360deg);
 }
`;

 const Loader = styled.div`
  padding: 10px;
  border: 6px solid pink;
  border-bottom-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 22px;
  animation: ${rotate} 1s linear infinite;
  height: 0;
  width: 0;
`;

export default Loader;