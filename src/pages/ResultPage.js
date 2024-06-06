import { useEffect, useState, useRef } from "react";
import Container from "../components/styles/Container.styled";
import {
  fadeIn,
  scaleIn,
  scaleOut,
} from "../components/styles/Animation.styled";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../UserContext";
import { theme } from "../Global";
import BackButton from "../components/styles/BackButton.styled";
import { t } from "i18next";
import axios from "axios";
import LoadingIconSpinner from "../components/styles/LoadingIcon.styled";

const Yin = styled.span`
  width: 100%;
  height: 16px;
  background: ${(props) =>
    props.$isChanged ? `${theme.color.primary}` : "#000"};
  display: block;
  position: relative;
  &::before {
    content: "";
    width: 15%;
    height: 32px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const Young = styled.span`
  width: 100%;
  height: 16px;
  background: ${(props) =>
    props.$isChanged ? `${theme.color.primary}` : "#000"};
  display: block;
  position: relative;
`;
const HexagramImg = ({ arr, changes }) => {
  return (
    <>
      {[...arr]
        .reverse()
        .map((item, index) =>
          item === 0 ? (
            <Yin key={index} $isChanged={index === arr.length - changes} />
          ) : (
            <Young key={index} $isChanged={index === arr.length - changes} />
          )
        )}
    </>
  );
};

const UpSection = styled.div`
  width: 100%;
  display: flex;
  gap: 32px;
  .HG,
  .UD {
    width: 50%;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    .HGTitle {
      margin-bottom: 8px;
      text-align: center;
      font-size: ${theme.font.subTitle.size};
      font-weight: ${theme.font.subTitle.weight};
    }
    .imgBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
  }
  .UD {
    font-size: ${theme.font.content.size};
    font-weight: ${theme.font.content.weight};
    position: relative;
    &::after {
      content: "";
      width: 1px;
      height: 100%;
      background: #000;
      position: absolute;
      left: -16px;
    }
  }
  .item {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    &.question {
      padding: 4px;
      border: 1px solid ${theme.color.gray};
      border-radius: 8px;
      box-shadow: 2px 2px ${theme.color.gray};
    }
    .title {
      font-size: ${theme.font.content.size};
      font-weight: ${theme.font.subTitle.weight};
    }
  }
`;

const Answer = styled.div`
  width: 100%;
  padding: 8px 8px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  gap: 8px;
  .item {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .title {
    font-size: ${theme.font.content.size};
    font-weight: ${theme.font.subTitle.weight};
  }
  p {
    font-size: ${theme.font.content.size};
    font-weight: ${theme.font.content.weight};
    text-align: left;
  }
`;

const Toolbar = styled.div`
  width: 100%;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: fixed;
  bottom: 0;
  button {
    flex: 1;
    max-width: 260px;
    padding: 8px;
    background: ${theme.color.primary};
    border: none;
    border-radius: 8px;
    text-align: center;
    font-size: ${theme.font.content.size};
    font-weight: ${theme.font.content.weight};
    line-height: ${theme.font.content.lineHeight};
    color: #fff;
    cursor: pointer;
    &:hover {
      background: ${theme.color.primaryHover};
      color: #fff;
    }
  }
  .back {
    max-width: 260px;
  }
`;

const AIModal = styled.div.attrs({ className: "AIModal" })`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  &.closing {
    display: none;
  }
  .overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    animation: ${fadeIn} 0.3s ease-in;
    &.closing {
      transition: all 0.3s;
      background: rgba(0, 0, 0, 0);
    }
  }
  .modal {
    width: 360px;
    padding: 16px 24px;
    margin: auto 20px auto;
    background: #fff;
    border-radius: 16px;
    border: 1px solid ${theme.color.secondary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    box-shadow: 2px 2px ${theme.color.secondary};
    transform: scale(0);
    animation: ${scaleIn} 0.2s ease-in 0.3s forwards;
    &.closing {
      animation: ${scaleOut} 0.2s ease-out forwards;
    }
    .top {
      width: 100%;
      .title {
        width: 100%;
        display: block;
        text-align: center;
        font-size: ${theme.font.content.size};
        font-weight: ${theme.font.subTitle.weight};
      }
      .closeBtn {
        width: 24px;
        height: 24px;
        display: flex;
        position: absolute;
        right: 8px;
        top: 8px;
        cursor: pointer;
        &::after,
        &::before {
          content: "";
          width: 2px;
          height: calc(100% - 8px);
          background: #000;
          position: absolute;
          top: 20%;
          left: 50%;
          transform: rotate(45deg);
        }
        &::after {
          transform: rotate(-45deg);
        }
      }
    }
    .content {
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: ${theme.font.content.size};
        font-weight: ${theme.font.content.weight};
      }
    }
  }
`;

const ResultPage = () => {
  const cloudFunctionsURL =
    "https://us-central1-i-ching-1223e.cloudfunctions.net/generateTextFromAI";
  const isEffectCalledRef = useRef(false);
  const isLoading = useRef(true);
  const isAImodalCalled = useRef(false);
  const { userData, langData } = useUser();
  const { hexagramID } = useParams();
  const [hexagram, setHexagram] = useState();
  const [showAIModal, setShowAIModal] = useState(false);
  const [AISuggestion, setAISuggestion] = useState();

  const getHexagram = async () => {
    if (langData === "en") {
      const queryVar = query(
        collection(db, "hexagram"),
        where("id", "==", parseInt(hexagramID))
      );
      const querySnapshot = await getDocs(queryVar);
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          setHexagram(doc.data());
        });
      }
    } else if (langData === "zh") {
      const docRef = doc(db, "六十四卦", hexagramID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHexagram(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  };

  const handleAIResponse = async () => {
    setShowAIModal(true);
    const data = {
      userQuestion: userData.question,
      fortuneResult: {
        guaCi: hexagram?.description,
        bianYao: hexagram?.linesMeaning[userData.changes - 1],
        userLanguage: langData,
      },
    };
    if (!isAImodalCalled.current) {
      try {
        const response = await axios.post(cloudFunctionsURL, data);
        const AIResponse = response.data.response;
        setAISuggestion(AIResponse);
        isLoading.current = false;
        isAImodalCalled.current = true;
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleCloseModal = () => {
    document.querySelector(".modal").classList.add("closing");
    document.querySelector(".overlay").classList.add("closing");
    setTimeout(() => {
      setShowAIModal(false);
    }, 300);
  };

  useEffect(() => {
    if (!isEffectCalledRef.current) {
      isEffectCalledRef.current = true;
      getHexagram();
    }
  }, []);

  return (
    <>
      <Container>
        {hexagram && (
          <>
            <UpSection>
              <div className="HG">
                <span className="HGTitle">{hexagram.name}</span>
                <div className="imgBox">
                  <HexagramImg
                    arr={hexagram.lines}
                    changes={userData.changes}
                  />
                </div>
              </div>
              <div className="UD">
                <div className="item question">
                  <span className="title">{t("result.question")}</span>
                  <p>{userData.question}</p>
                </div>
                <div className="item">
                  <span className="title">{t("result.judgment")}</span>
                  <p>{hexagram.judgment}</p>
                </div>
                <div className="item">
                  <span className="title">{t("result.lines")}</span>
                  <p>{hexagram.linesMeaning[userData.changes - 1]}</p>
                </div>
              </div>
            </UpSection>
            <Answer>
              <div className="item">
                <span className="title">{t("result.paraphrase")}</span>
                <p>{hexagram.description}</p>
              </div>
            </Answer>
          </>
        )}
        <Toolbar>
          <BackButton className="back" to="/">
            {t("button.home")}
          </BackButton>
          <button onClick={handleAIResponse}>{t("button.aiHelper")}</button>
        </Toolbar>
      </Container>
      {showAIModal && (
        <AIModal>
          <div className="overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="top">
              <span className="title">{t("button.aiHelper")}</span>
              <span className="closeBtn" onClick={handleCloseModal}></span>
            </div>
            <div className="content">
              {isLoading.current === true && <LoadingIconSpinner />}
              <p>{AISuggestion}</p>
            </div>
          </div>
        </AIModal>
      )}
    </>
  );
};

export default ResultPage;
