import MainPage from "../components/pages/mainPage/MainPage";
import Login from "../components/pages/login/login";
import Registration from "../components/pages/registration/registration";

export const Paths = [
    {
        path: "/",
        page:  MainPage
    },
    {
        path: "/login",
        page:  Login
    },
    {
        path: "/register",
        page:  Registration
    }
]