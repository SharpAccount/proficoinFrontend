import {createContext, useState} from "react";

export const Context = createContext({});

export function ContextWrapper({ children }) {

    const initUser = {
        login: "",
        address: "0x0",
        publicBalance: 0,
        privateBalance: 0,
        seedBalance: 0,
        role: 0,
        isInWhiteList: false
    }

    const [Sender, setSender] = useState(initUser);


    const values = {
        Sender,
        setSender
    }

    return (
        <Context.Provider value = {values}>
            { children }
        </Context.Provider>
    )
}