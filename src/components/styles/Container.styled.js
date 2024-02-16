import styled from "styled-components";

const Container = styled.div`
  width: ${({ width }) => width};
  max-width: 100%;
  height: ${({ height }) => height};
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export default Container;
