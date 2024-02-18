import { RouterProvider } from 'react-router-dom';
import router from './router';
import GlobalStyles from './components/styles/GlobalStyles';
import { theme } from './Global';
import { ThemeProvider } from 'styled-components';
function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<RouterProvider router={router}></RouterProvider>
		</ThemeProvider>
	);
}

export default App;
