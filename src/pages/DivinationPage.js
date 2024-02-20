import Container from "../components/styles/Container.styled";
import OpenFadeIn from "../components/styles/FadeIn";
import styled from "styled-components";
import { theme } from "../Global";
import { useForm } from "react-hook-form";
import { useState } from "react";
import BackButton from "../components/styles/BackButton.styled";

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
        flex: 1;
        padding: 8px;
        background: #fff;
        border: 1px solid ${theme.color.secondary};
        border-radius: 8px;
        text-align: center;
        font-size: ${theme.font.content.size};
        font-weight: ${theme.font.content.weight};
        line-height: ${theme.font.content.lineHeight};
        color: ${theme.color.secondary};
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
    // 在這裡處理提交邏輯
    console.log(data);
  };

  return (
    <OpenFadeIn>
      <Container height="100dvh">
        <NoticeStyled>
          <Title style={{ alignSelf: "center" }}>Notice</Title>
          <li className="item">
            Associate three sets of three-digit numbers with non-zero first
            digits.
          </li>
          <li className="item">
            Avoid using intentionally meaningful numbers.
          </li>
          <li className="item">
            Input the numbers sequentially, starting from the first set.
          </li>
          <li className="item">
            The submit button activates after entering each set.
          </li>
        </NoticeStyled>
        <FormStyled>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="first">
              <input
                {...register("first", {
                  required: "Plz input first set",
                  pattern: {
                    value: /^[1-9]\d{2}$/,
                    message: "Plz input a valid format",
                  },
                  minLength: { value: 3, message: "Plz input a valid format" },
                })}
                id="first"
                placeholder="First set"
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
                  required: "Plz input second set",
                  pattern: {
                    value: /^[1-9]\d{2}$/,
                    message: "Plz input a valid format",
                  },
                  minLength: { value: 3, message: "Plz input a valid format" },
                })}
                id="second"
                placeholder="Second set"
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
                  required: "Plz input third set",
                  pattern: {
                    value: /^[1-9]\d{2}$/,
                    message: "Plz input a valid format",
                  },
                  minLength: { value: 3, message: "Plz input a valid format" },
                })}
                id="third"
                placeholder="Third set"
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
                BACK
              </BackButton>

              <button
                className={inputStatus.button ? "" : "isActive"}
                type="submit"
                disabled={inputStatus.button}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </FormStyled>
      </Container>
    </OpenFadeIn>
  );
};

export default DivinationPage;
