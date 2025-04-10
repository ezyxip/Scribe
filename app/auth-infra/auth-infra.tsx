import { createContext, useContext, type JSX } from "react";
import { Outlet } from "react-router";

export type User = {
    username: string,
    credentials: string[],
    data: Record<string, any>,
}

export type AuthProviderProps = {
    onLogin: (auth: User) => void,
}

export interface AuthProvider{
    render: (app: AuthProviderProps) => JSX.Element
}

export type AuthProviderRegistrator = {[key: string]: AuthProvider}

export const AuthProviderContext = createContext<AuthProviderRegistrator>({});

const AuthProviderWrapper = () => {
    return (
        <AuthProviderContext.Provider value={{}}>
            <Outlet />
        </AuthProviderContext.Provider>
    )
}
export default AuthProviderWrapper;

export const useAuthProviders = () => useContext(AuthProviderContext);

export const addAuthProvider = (name: string, provider: AuthProvider) => {
    const authProviders = useAuthProviders();
    authProviders[name] = provider
}