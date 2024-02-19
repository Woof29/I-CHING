import { createHashRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoticePage from "./pages/NoticePage";
import UserInfoPage from "./pages/UserInfoPage";

const router = createHashRouter([
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
    element: <UserInfoPage />,
  },
  {
    path: "/divination",
    element: <h1>This is Divination</h1>,
  },
]);

export default router;
