import { useEffect } from "react";
import { useState } from "react";
import Container from "../components/styles/Container.styled";
import OpenFadeIn from "../components/styles/FadeIn";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const ResultPage = () => {
  const [hexagram, setHexagram] = useState();

  const getHexagram = async () => {
    const querySnapshot = await getDocs(collection(db, "hexagram"));
    const hexagramData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    setHexagram(hexagramData);
    // console.log(hexagramData);
  };

  useEffect(() => {
    getHexagram();
  }, []);

  return (
    <OpenFadeIn>
      <Container height="100dvh">
        <h1>This is result</h1>
        {/* {hexagram &&
          hexagram.map((item, i) => (
            <div key={i}>
              <h1>{item.name}</h1>
              <p>{item.judgment}</p>
            </div>
          ))} */}
      </Container>
    </OpenFadeIn>
  );
};

export default ResultPage;
