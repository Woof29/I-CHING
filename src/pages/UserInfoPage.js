import styled from "styled-components";
import Container from "../components/styles/Container.styled";
import { theme } from "../Global";
import { useForm } from "react-hook-form";
import BackButton from "../components/styles/BackButton.styled";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { t } from "i18next";
import PrimaryButton from "../components/styles/PrimaryButton.styled";

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
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 4px;
      .notice {
        flex-basis: 100%;
        text-align: right;
        font-size: 14px;
        font-weight: 700;
        color: ${theme.color.primary};
      }
      span {
        flex: 25% 0 0;
      }
      input,
      select,
      textarea {
        flex: 1;
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
      textarea {
        width: 100%;
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
  }
`;

const UserInfoPage = () => {
  const navigate = useNavigate();
  const { setFormUserData } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      gender: "",
    },
  });

  const onSubmit = async (data) => {
    await setFormUserData(data); // 將表單數據存儲到全域狀態
    navigate("/divination");
  };

  return (
    <Container>
      <FormStyled>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">
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
          </label>

          <label htmlFor="question">
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
          </label>

          <div className="toolbar">
            <BackButton
              to="/notice"
              width="260px"
              color={theme.color.secondary}
            >
              {t("button.back")}
            </BackButton>
            <PrimaryButton type="submit">{t("button.submit")}</PrimaryButton>
          </div>
        </form>
      </FormStyled>
    </Container>
  );
};

export default UserInfoPage;
