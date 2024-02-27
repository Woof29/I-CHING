import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = sessionStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const [langData, setLangData] = useState(() => {
    const storedLang = sessionStorage.getItem("lang");
    return storedLang ? JSON.parse(storedLang) : "zh";
  });

  useEffect(() => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
    sessionStorage.setItem("lang", JSON.stringify(langData));
  }, [userData, langData]);

  const setFormUserData = (data) => {
    setUserData(data);
  };
  const setFormLangData = (data) => {
    setLangData(data);
  };

  return (
    <UserContext.Provider
      value={{ userData, setFormUserData, langData, setFormLangData }}
    >
      {children}
    </UserContext.Provider>
  );
};
