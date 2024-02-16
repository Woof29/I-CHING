import { useState } from "react";
import Container from "../components/styles/Container.styled";
import OpenFadeIn from "../components/styles/FadeIn";
import { theme } from "../Global";
import styled from "styled-components";

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

const NoticeList = ({ className }) => {
  return (
    <div className={className}>
      <ul className="nl">
        <li className="item">
          Seek divination with a sincere heart and genuine doubts.
        </li>
        <li className="item">
          Ensure the question is morally just for meaningful divination results.
        </li>
        <li className="item">
          Avoiding ask unnecessary question that easily determined through
          common sense.
        </li>
      </ul>
    </div>
  );
};

const NLStyled = styled(NoticeList)`
  .nl {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    list-style: decimal;
  }
  .item {
    margin-left: 20px;
    font-size: ${theme.font.content.size};
    font-weight: ${theme.font.content.weight};
    line-height: ${theme.font.content.lineHeight};
  }
`;

const AG = ({ className }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className={className}>
      <input
        className={isChecked ? "checked" : ""}
        onChange={() => setIsChecked((prev) => !prev)}
        type="checkbox"
        id="agree"
      ></input>
      <label for="agree">Got it!</label>
    </div>
  );
};
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
  }
`;

const NoticePage = () => {
  return (
    <OpenFadeIn>
      <Container height="100dvh">
        <NoticeWrap>
          <Title>Notice</Title>
          <NLStyled></NLStyled>
          <AGStyled></AGStyled>
        </NoticeWrap>
      </Container>
    </OpenFadeIn>
  );
};

export default NoticePage;
