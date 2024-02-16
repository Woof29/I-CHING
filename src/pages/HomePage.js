import styled from "styled-components";
import { theme } from "../Global";
import OpenFadeIn from "../components/styles/FadeIn";
import Container from "../components/styles/Container.styled";
import StartButton from "../components/PrimaryButton.styled";

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
        <StartButton to="/notice">START</StartButton>
      </Container>
    </OpenFadeIn>
  );
};

export default HomePage;
