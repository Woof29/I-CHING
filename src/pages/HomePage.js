// import { Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../Global";
import OpenFadeIn from "../components/styles/FadeIn";
import Container from "../components/styles/Container.styled";
import GlobalStyles from "../components/styles/Global";

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
        <Container height="100dvh">
          <OpenFadeIn>
            <Title>
              I CHING
              <br />
              Web of Changes
            </Title>
          </OpenFadeIn>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default HomePage;
