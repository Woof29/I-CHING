import styled from 'styled-components';
import { theme } from '../Global';
import Container from '../components/styles/Container.styled';
import PrimaryButton from '../components/styles/PrimaryButton.styled';
import { useTranslation } from 'react-i18next';

const Title = styled.h1`
	font-size: ${theme.font.mainTitle.size};
	font-weight: ${theme.font.mainTitle.weight};
	line-height: ${theme.font.mainTitle.lineHeight};
`;

const HomePage = () => {
	const { t } = useTranslation();
	return (
		<Container>
			<Title>
				{t('homepage.title')}
				<br />
				{t('homepage.subtitle')}
			</Title>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<PrimaryButton
					to="/notice"
					flex="none"
					width="255px"
					bg={theme.color.primary}
					hover={theme.color.primaryHover}>
					START
				</PrimaryButton>
			</div>
		</Container>
	);
};

export default HomePage;
