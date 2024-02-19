import { RouterProvider } from "react-router-dom";
import router from "./router";
import GlobalStyles from "./components/styles/GlobalStyles";
import { theme } from "./Global";
import { ThemeProvider } from "styled-components";
function App() {
  return (
    <RouterProvider router={router}>
      <GlobalStyles />
      <ThemeProvider theme={theme}></ThemeProvider>
    </RouterProvider>
  );
}

export default App;
