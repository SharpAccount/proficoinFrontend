import {createContext, useState} from "react";

export const Context = createContext({});

export function ContextWrapper({ children }) {

    const initUser = {
        login: "",
        address: "",
        publicBalance: 0,
        privateBalance: 0,
        seedBalance: 0,
        role: 0,
        isInWhiteList: false
    }

    const [user, setUser] = useState(initUser);

    const setUserData = (user) => {
        setUser(user);
    }


    const values = {
        user,
        setUserData
    }

    return (
        <Context.Provider value = {values}>
            { children }
        </Context.Provider>
    )
}