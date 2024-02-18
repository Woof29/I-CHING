import styled from 'styled-components';
import { theme } from '../Global';
import OpenFadeIn from '../components/styles/FadeIn';
import Container from '../components/styles/Container.styled';
import PrimaryButton from '../components/styles/PrimaryButton.styled';

const Title = styled.h1`
	font-size: ${theme.font.mainTitle.size};
	font-weight: ${theme.font.mainTitle.weight};
	line-height: ${theme.font.mainTitle.lineHeight};
`;

const HomePage = () => {
	return (
		<OpenFadeIn>
			<Container height="100dvh">
				<Title>
					I CHING
					<br />
					Web of Changes
				</Title>
				<div
					style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<PrimaryButton
						to="/notice"
						flex="none"
						width="260px"
						bg={theme.color.primary}
						hover={theme.color.primaryHover}>
						START
					</PrimaryButton>
				</div>
			</Container>
		</OpenFadeIn>
	);
};

export default HomePage;
