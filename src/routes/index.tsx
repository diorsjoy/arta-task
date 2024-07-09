import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, HomePage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
export default router;
