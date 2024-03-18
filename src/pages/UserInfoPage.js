import styled from "styled-components";
import Container from "../components/styles/Container.styled";
import { theme } from "../Global";
import { useForm } from "react-hook-form";
import BackButton from "../components/styles/BackButton.styled";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { t } from "i18next";
import PrimaryButton from "../components/styles/PrimaryButton.styled";

const FormStyled = styled.form`
  width: 100%;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  .wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    label {
      width: 100%;
      margin-bottom: 4px;
    }
    textarea {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid ${theme.color.gray};
      box-shadow: 2px 2px ${theme.color.gray};
      outline: none;
      resize: none;
      transition: all 0.2s;
      &:focus {
        border: 1px solid ${theme.color.secondary};
        box-shadow: 2px 2px ${theme.color.secondary};
      }
      &:active {
        background: #fff;
      }
    }
    .notice {
      flex-basis: 100%;
      text-align: right;
      font-size: 14px;
      font-weight: 700;
      color: ${theme.color.primary};
    }
  }

  .toolbar {
    width: 100%;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
`;

const UserInfoPage = () => {
  const navigate = useNavigate();
  const { setFormUserData } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await setFormUserData(data); // 將表單數據存儲到全域狀態
    navigate("/divination");
  };

  return (
    <Container>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        {/* <label htmlFor="name">
            <span>{t("userinfo.label1")}</span>
            <input
              {...register("name", {
                required: t("userinfo.required.item1"),
              })}
              id="name"
            ></input>
            {!!errors.name && <p className="notice">{errors.name?.message}</p>}
          </label>

          <label htmlFor="gender">
            <span>{t("userinfo.label2")}</span>
            <select
              {...register("gender", {
                required: t("userinfo.required.item2"),
              })}
              id="gender"
            >
              <option value={t("userinfo.genderOP.option1")}>
                {t("userinfo.genderOP.option1")}
              </option>
              <option value={t("userinfo.genderOP.option2")}>
                {t("userinfo.genderOP.option2")}
              </option>
              <option value={t("userinfo.genderOP.option3")}>
                {t("userinfo.genderOP.option3")}
              </option>
            </select>
            {!!errors.gender && (
              <p className="notice">{errors.gender?.message}</p>
            )}
          </label>

          <label htmlFor="bd">
            <span>{t("userinfo.label3")}</span>
            <input
              type="date"
              {...register("birthday", {
                required: t("userinfo.required.item3"),
                max: {
                  value: "2018-01-01",
                  message: t("userinfo.BDmax"),
                },
              })}
              id="bd"
            ></input>
            {!!errors.birthday && (
              <p className="notice">{errors.birthday?.message}</p>
            )}
          </label> */}

        <div className="wrap">
          <label htmlFor="question">{t("userinfo.label4")}</label>
          <textarea
            {...register("question", {
              required: t("userinfo.required.item4"),
              minLength: {
                value: 10,
                message: t("userinfo.Qmin"),
              },
            })}
            id="question"
            rows="5"
            placeholder={t("userinfo.QPH")}
            maxLength={200}
          ></textarea>
          {!!errors.question && (
            <p className="notice">{errors.question?.message}</p>
          )}
        </div>

        <div className="toolbar">
          <BackButton to="/notice" width="260px" color={theme.color.secondary}>
            {t("button.back")}
          </BackButton>
          <PrimaryButton type="submit">{t("button.submit")}</PrimaryButton>
        </div>
      </FormStyled>
    </Container>
  );
};

export default UserInfoPage;
