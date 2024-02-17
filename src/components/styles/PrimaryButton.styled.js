import styled from "styled-components";
import { theme } from "../../Global";
import { Link } from "react-router-dom";

const PrimaryButton = styled(Link)`
  width: ${(props) => props.width || "auto"};
  padding: 8px;
  background: ${(props) => props.bg || theme.color.default};
  border: none;
  border-radius: 8px;
  text-align: center;
  font-size: ${theme.font.content.size};
  font-weight: ${theme.font.content.weight};
  line-height: ${theme.font.content.lineHeight};
  color: #fff;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.hover || theme.color.default};
    color: #fff;
  }
`;

export default PrimaryButton;
