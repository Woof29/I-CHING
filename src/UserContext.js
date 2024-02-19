import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);

	const setFormUserData = (data) => {
		setUserData(data);
	};

	return (
		<UserContext.Provider value={{ userData, setFormUserData }}>
			{children}
		</UserContext.Provider>
	);
};
