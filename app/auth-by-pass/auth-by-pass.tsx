import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { AuthProvider, AuthProviderProps } from "~/auth-infra/auth-infra";

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
