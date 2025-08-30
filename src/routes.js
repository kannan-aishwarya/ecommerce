import { Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { ProtectedRoute } from "./components/protectedRoute";
import Layout from "./components/layout";
import { Children } from "react";
import Home from "./pages/home";
import Profile from "./pages/profile";


const routes = [
    {
        path: "/",
        element: <Login />
    },
    {
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [ 
            { path: "/home", element: <Home /> },
            { path: "/profile", element: <Profile/>}
        ],
    },
    {
        path: "/signup",
        element: <Signup />
    }
]
export default routes;