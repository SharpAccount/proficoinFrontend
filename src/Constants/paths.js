import MainPage from "../UI/Pages/mainPage/MainPage";
import Login from "../UI/Pages/login/login";
import Registration from "../UI/Pages/registration/registration";

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