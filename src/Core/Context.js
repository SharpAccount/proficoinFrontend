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
    const [user, setUser] = useState(initUser);

    const setTokenInfo = (tokenInfo) => {
        setTokens(tokenInfo);
    }

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
        tokensInfo,
        setTokenInfo
    }

    return (
        <Context.Provider value = {values}>
            { children }
        </Context.Provider>
    )
}