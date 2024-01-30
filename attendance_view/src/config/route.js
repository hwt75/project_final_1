import { Navigate } from "react-router-dom";
import LoginPage from "../pages/Auth/login";
import Comment from "../pages/Attendance/attendance";
import NotFoundPage from "../pages/Error/NotFound"

const routes = [
    {
        path: "*",
        element: <Comment />,
        children: [
            { path: "404", element: <NotFoundPage /> },
            { path: "*", element: <Navigate to="/comment/404" /> },
          ],
    },

  
]

export default routes
