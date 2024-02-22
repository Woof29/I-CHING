import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState(() => {
		const storedUserData = sessionStorage.getItem('userData');
		return storedUserData ? JSON.parse(storedUserData) : null;
	});

	useEffect(() => {
		sessionStorage.setItem('userData', JSON.stringify(userData));
	}, [userData]);

	const setFormUserData = (data) => {
		setUserData(data);
	};

	return (
		<UserContext.Provider value={{ userData, setFormUserData }}>
			{children}
		</UserContext.Provider>
	);
};
