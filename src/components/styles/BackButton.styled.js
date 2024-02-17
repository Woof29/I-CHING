import styled from "styled-components";
import { theme } from "../../Global";
import { Link } from "react-router-dom";

const BackButton = styled(Link)`
  width: ${(props) => props.width || "auto"};
  height: 40px;
  padding: 8px;
  background: ${(props) => props.bg || theme.color.default};
  border: 0.2px solid ${theme.color.secondary};
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: ${theme.font.content.size};
  font-weight: ${theme.font.content.weight};
  line-height: ${theme.font.content.lineHeight};
  color: ${(props) => props.color || "#fff"};
  cursor: pointer;
`;

export default BackButton;
