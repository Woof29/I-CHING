import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import GlobalStyles from './components/styles/GlobalStyles';
import { theme } from './Global';
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ThemeProvider theme={theme}>
		<GlobalStyles />
		<RouterProvider router={router}></RouterProvider>
	</ThemeProvider>
);
reportWebVitals();
