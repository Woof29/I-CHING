import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoticePage from "./pages/NoticePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/notice",
    element: <NoticePage />,
  },
  {
    path: "/userInfo",
    element: <h1>This is userInfo</h1>,
  },
]);

export default router;
