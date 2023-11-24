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

    const initTokensInfo = {
        ethBalance: 0,
        seedBalance: 0,
        privateBalance: 0,
        publicBalance: 0,
    }

    const [tokensInfo, setTokens] = useState(initTokensInfo);

    const setTokenInfo = (tokeninfo) => {
        setTokens(tokeninfo);
    }

    const [userToCheck, setUserToCheck] = useState(initUser);

    const setUserToCheckData = (userToCheck) => {
        setUserToCheck(userToCheck);
    }

    const [user, setUser] = useState(initUser);

    const setUserData = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(initUser);
    }

    const values = {
        user,
        setUserData,
        logout,
        userToCheck,
        setUserToCheckData
    }

    return (
        <Context.Provider value = {values}>
            { children }
        </Context.Provider>
    )
}