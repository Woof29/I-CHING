import styled from "styled-components";
import { theme } from "../Global";
import { Link } from "react-router-dom";

const StartButton = styled(Link)`
  width: 260px;
  padding: 8px;
  background: ${theme.color.primary};
  border: none;
  border-radius: 8px;
  text-align: center;
  font-size: ${theme.font.content.size};
  font-weight: ${theme.font.content.weight};
  line-height: ${theme.font.content.lineHeight};
  color: #fff;
  cursor: pointer;
  &:hover {
    background: ${theme.color.primaryHover};
    color: #fff;
  }
`;

export default StartButton;
