import { RouterProvider } from "react-router-dom";
import GlobalStyles from "./components/styles/GlobalStyles";
import { theme } from "./Global";
import { ThemeProvider } from "styled-components";
import router from "./router";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
