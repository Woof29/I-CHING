import styled from "styled-components";
import { theme } from "../Global";
import Container from "../components/styles/Container.styled";
import PrimaryButton from "../components/styles/PrimaryButton.styled";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { useEffect } from "react";
// import generateTextFromAI from "../utils/openAI_API";

const Title = styled.h1`
  font-size: ${theme.font.mainTitle.size};
  font-weight: ${theme.font.mainTitle.weight};
  line-height: ${theme.font.mainTitle.lineHeight};
`;

const STContainer = styled(Container)`
  max-width: 300px;
  h1 {
    width: 100%;
  }
  select {
    width: 50%;
    padding: 8px;
    margin-top: 8px;
    border: 1px solid ${theme.color.gray};
    border-radius: 4px;
    outline: none;
    resize: none;
    &:focus {
      outline: 1px solid ${theme.color.secondary};
    }
    &:active {
      background: #fff;
    }
  }
`;

const HomePage = () => {
  // const functions = getFunctions();
  // const generatedText = httpsCallable(functions, "generateTextFromAI");
  // const userQuestion = "今年工作如何?";
  // const fortuneResult = "乾卦";
  // const onSubmit = () => {
  //   generatedText({ userQuestion, fortuneResult })
  //     .then((result) => {
  //       console.log("Generated Text:", result.data.result);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const { langData, setFormLangData } = useUser();
  const { t, i18n } = useTranslation();
  const changeLng = (lng) => {
    i18n.changeLanguage(lng);
    setFormLangData(lng);
  };

  const navigate = useNavigate();
  const handleRouterChange = () => {
    navigate("/notice");
  };

  return (
    <STContainer>
      <Title>
        {t("homepage.title")}
        <br />
        {t("homepage.subtitle")}
      </Title>

      <PrimaryButton onClick={handleRouterChange} width="100%" $flex="none">
        {t("button.start")}
      </PrimaryButton>

      <select
        defaultValue={langData}
        onChange={(e) => changeLng(e.target.value)}
      >
        <option value="zh">繁體中文</option>
        <option value="en">English</option>
      </select>
      {/* <button onClick={() => onSubmit()}>BUTTON</button> */}
    </STContainer>
  );
};

export default HomePage;
