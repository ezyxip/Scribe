import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthProviders, type AuthProvider, type AuthProviderProps } from "~/auth-infra/auth-infra";

const AuthByPass = (props: AuthProviderProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TextField
                fullWidth
                label="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                fullWidth
                label="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={() =>
                    props.onLogin({
                        username: username,
                        credentials: [],
                        data: {},
                    })
                }
                fullWidth
            >
                Login
            </Button>
        </Box>
    );
};
export default AuthByPass;

export const AuthByPassProvider: AuthProvider = {
    render: AuthByPass,
};


export const AuthByPassPreview = () => {
    const ap = useAuthProviders();
    return (
        <Grid2 container sx={{ width: "100%", height: "100vh"}} justifyContent={"center"} alignItems={"center"}>
            <Grid2
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <AuthByPass onLogin={() => {}} />
            </Grid2>
        </Grid2>
    );
}