import styled from 'styled-components';
import { theme } from '../Global';

const PrimaryButton = styled.button`
	width: 260px;
	padding: 8px;
	background: ${theme.color.button.primary};
	border: none;
	border-radius: 8px;
	font-size: ${theme.font.content.size};
	font-weight: ${theme.font.content.weight};
	line-height: ${theme.font.content.lineHeight};
	color: #fff;
	cursor: pointer;
	&:hover {
		background: ${theme.color.button.primaryHover};
	}
`;

export default PrimaryButton;
