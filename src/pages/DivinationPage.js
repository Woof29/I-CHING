import Container from "../components/styles/Container.styled";
import styled from "styled-components";
import { theme } from "../Global";
import { useForm } from "react-hook-form";
import { useState } from "react";
import BackButton from "../components/styles/BackButton.styled";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { t } from "i18next";
import PrimaryButton from "../components/styles/PrimaryButton.styled";

const Title = styled.span`
  font-size: ${theme.font.subTitle.size};
  font-weight: ${theme.font.subTitle.weight};
  line-height: ${theme.font.subTitle.lineHeight};
`;

const FormStyled = styled.div`
  width: 100%;
  form {
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    label {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 4px;

      .notice {
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        color: ${theme.color.primary};
      }
      input {
        width: 100%;
        padding: 8px;
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
    }
    .toolbar {
      width: 100%;
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      button {
        background: #fff;
        border: 1px solid ${theme.color.secondary};
        color: ${theme.color.secondary};
        cursor: initial;
        &.isActive {
          background: ${theme.color.primary};
          border: none;
          color: #fff;
          cursor: pointer;
          &:hover {
            background: ${theme.color.primaryHover};
            color: #fff;
          }
        }
      }
    }
  }
`;

const NoticeStyled = styled.ul`
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid ${theme.color.secondary};
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

const DivinationPage = () => {
  const navigate = useNavigate();
  const { setFormUserData } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputStatus, setInputStatus] = useState({
    first: false,
    second: true,
    third: true,
    button: true,
  });

  const handleInputChange = (inputName) => {
    setInputStatus((prev) => ({
      ...prev,
      [inputName]: false,
    }));
  };

  const onSubmit = (data) => {
    const firstNumber = parseInt(data.first, 10);
    const secondNumber = parseInt(data.second, 10);
    const thirdNumber = parseInt(data.third, 10);
    const above = firstNumber % 8 === 0 ? 8 : firstNumber % 8;
    const below = secondNumber % 8 === 0 ? 8 : secondNumber % 8;
    const changes = thirdNumber % 6 === 0 ? 6 : thirdNumber % 6;
    setFormUserData((prevUserData) => ({ ...prevUserData, changes }));
    navigate(`/result/${above}${below}`);
  };

  return (
    <Container>
      <NoticeStyled>
        <Title style={{ alignSelf: "center" }}>{t("divination.title")}</Title>
        <li className="item">{t("divination.list.item1")}</li>
        <li className="item">{t("divination.list.item2")}</li>
        <li className="item">{t("divination.list.item3")}</li>
        <li className="item">{t("divination.list.item4")}</li>
      </NoticeStyled>
      <FormStyled>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="first">
            <input
              {...register("first", {
                required: t("divination.required.item1"),
                pattern: {
                  value: /^[1-9]\d{2}$/,
                  message: t("divination.error"),
                },
                minLength: { value: 3, message: t("divination.error") },
              })}
              id="first"
              placeholder={t("divination.PH.item1")}
              disabled={inputStatus.first}
              onChange={() => handleInputChange("second")}
              maxLength={3}
            ></input>
            {!!errors.first && (
              <p className="notice">{errors.first?.message}</p>
            )}
          </label>

          <label htmlFor="second">
            <input
              {...register("second", {
                required: t("divination.required.item2"),
                pattern: {
                  value: /^[1-9]\d{2}$/,
                  message: t("divination.error"),
                },
                minLength: { value: 3, message: t("divination.error") },
              })}
              id="second"
              placeholder={t("divination.PH.item2")}
              disabled={inputStatus.second}
              onChange={() => handleInputChange("third")}
              maxLength={3}
            ></input>
            {!!errors.second && (
              <p className="notice">{errors.second?.message}</p>
            )}
          </label>
          <label htmlFor="third">
            <input
              {...register("third", {
                required: t("divination.required.item3"),
                pattern: {
                  value: /^[1-9]\d{2}$/,
                  message: t("divination.error"),
                },
                minLength: { value: 3, message: t("divination.error") },
              })}
              id="third"
              placeholder={t("divination.PH.item3")}
              disabled={inputStatus.third}
              onChange={() => handleInputChange("button")}
              maxLength={3}
            ></input>
            {!!errors.third && (
              <p className="notice">{errors.third?.message}</p>
            )}
          </label>

          <div className="toolbar">
            <BackButton to="/userInfo" width="260px">
              {t("button.back")}
            </BackButton>

            <PrimaryButton
              className={inputStatus.button ? "" : "isActive"}
              type="submit"
              disabled={inputStatus.button}
            >
              {t("button.submit")}
            </PrimaryButton>
          </div>
        </form>
      </FormStyled>
    </Container>
  );
};

export default DivinationPage;
