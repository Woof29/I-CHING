// import { Link } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../Global';
import OpenFadeIn from '../components/styles/FadeIn';
import Container from '../components/styles/Container.styled';
import GlobalStyles from '../components/styles/Global';
import PrimaryButton from '../components/PrimaryButton';

const Title = styled.h1`
	font-size: ${theme.font.mainTitle.size};
	font-weight: ${theme.font.mainTitle.weight};
	line-height: ${theme.font.mainTitle.lineHeight};
`;

const HomePage = () => {
	return (
		<ThemeProvider theme={theme}>
			<>
				<GlobalStyles />
				<OpenFadeIn>
					<Container height="100dvh">
						<Title>
							I CHING
							<br />
							Web of Changes
						</Title>
						<PrimaryButton>START</PrimaryButton>
					</Container>
				</OpenFadeIn>
			</>
		</ThemeProvider>
	);
};

export default HomePage;
