import { createContext, useContext } from "react";
import { Outlet } from "react-router";

interface UserCredentials{
    username: string;
    credentials: string[];

}

const userContext = createContext<UserCredentials>({
    username: "anonym",
    credentials: []
});

export default function UserWrapper(){
    return (
        <userContext.Provider value={{username: "anonym", credentials: []}}>
            <Outlet />
        </userContext.Provider>
    )
}

export const useUser = () => useContext(userContext);