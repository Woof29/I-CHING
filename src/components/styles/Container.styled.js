import styled from "styled-components";

const Container = styled.div`
  width: ${({ width }) => width};
  max-width: 100%;
  height: ${({ height }) => height};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Container;
