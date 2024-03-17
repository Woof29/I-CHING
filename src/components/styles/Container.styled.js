import styled from 'styled-components';
import { fadeIn } from './Animation.styled';

const Container = styled.div`
	width: ${(props) => props.width};
	max-width: 600px;
	min-height: 100dvh;
	padding: 20px;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16px;
	overflow-y: auto;
	animation: ${fadeIn} 0.5s ease-in;
	position: relative;
`;

export default Container;
