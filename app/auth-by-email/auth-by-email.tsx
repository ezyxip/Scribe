import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import type { AuthProvider, AuthProviderProps } from "~/auth-infra/auth-infra";

export const AuthByEmail = (props: AuthProviderProps) => {
    const [email, setEmail] = useState("");
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
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
            />
            <Button
                variant="contained"
                onClick={() =>
                    props.onLogin({
                        username: email,
                        credentials: [],
                        data: {},
                    })
                }
                fullWidth
            >
                Send code
            </Button>
        </Box>
    );
};

export const AuthByEmailProvider: AuthProvider = {
    render: AuthByEmail,
}