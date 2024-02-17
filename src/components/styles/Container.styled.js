import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.width};
  max-width: 600px;
  height: ${(props) => props.height};
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export default Container;
