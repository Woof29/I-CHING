import { useState } from "react";
import Container from "../components/styles/Container.styled";
import OpenFadeIn from "../components/styles/FadeIn";
import { theme } from "../Global";
import styled from "styled-components";
import PrimaryButton from "../components/styles/PrimaryButton.styled";
import BackButton from "../components/styles/BackButton.styled";

const NoticeWrap = styled.div`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${theme.color.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
const Title = styled.span`
  font-size: ${theme.font.subTitle.size};
  font-weight: ${theme.font.subTitle.weight};
  line-height: ${theme.font.subTitle.lineHeight};
`;

// notice list comp
const NoticeList = ({ className }) => {
  return (
    <ul className={className}>
      <li>Seek divination with a sincere heart and genuine doubts.</li>
      <li>
        Ensure the question is morally just for meaningful divination results.
      </li>
      <li>
        Avoiding ask unnecessary question that easily determined through common
        sense.
      </li>
    </ul>
  );
};
// notice list style
const NLStyled = styled(NoticeList)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  list-style: decimal;

  li {
    margin-left: 20px;
    font-size: ${theme.font.content.size};
    font-weight: ${theme.font.content.weight};
    line-height: ${theme.font.content.lineHeight};
  }
`;

// agree comp
const AG = ({ className, isChecked, setIsChecked }) => {
  return (
    <div className={className}>
      <input
        className={isChecked ? "checked" : ""}
        onChange={() => setIsChecked((prev) => !prev)}
        type="checkbox"
        id="agree"
      ></input>
      <label htmlFor="agree">Got it!</label>
    </div>
  );
};
// agree style
const AGStyled = styled(AG)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    border: 1px solid ${theme.color.secondary};
    outline: none;
    cursor: pointer;
    &.checked {
      position: relative;
      &::before {
        content: "";
        width: calc(100% - 8px);
        height: 2px;
        background: ${theme.color.primaryHover};
        position: absolute;
        top: 8px;
        left: 1px;
        transform: rotate(55deg);
      }
      &::after {
        content: "";
        width: calc(100% - 4px);
        height: 2px;
        background: ${theme.color.primaryHover};
        position: absolute;
        top: 6px;
        left: 3px;
        transform: rotate(120deg);
      }
    }
  }
  label {
    font-size: ${theme.font.content.size};
    font-weight: ${theme.font.content.weight};
    line-height: ${theme.font.content.lineHeight};
    cursor: pointer;
  }
`;

// next button comp
const NextButton = ({ isChecked }) => {
  return isChecked ? (
    <PrimaryButton
      to="/userInfo"
      bg={theme.color.primary}
      hover={theme.color.primaryHover}
    >
      NEXT
    </PrimaryButton>
  ) : (
    <BackButton color={theme.color.secondary} style={{ cursor: "unset" }}>
      NEXT
    </BackButton>
  );
};

const NoticePage = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <OpenFadeIn>
      <Container height="100dvh">
        <NoticeWrap>
          <Title>Notice</Title>
          <NLStyled></NLStyled>
          <AGStyled
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          ></AGStyled>
        </NoticeWrap>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <BackButton to="/">BACK</BackButton>
          <NextButton isChecked={isChecked} />
        </div>
      </Container>
    </OpenFadeIn>
  );
};

export default NoticePage;
