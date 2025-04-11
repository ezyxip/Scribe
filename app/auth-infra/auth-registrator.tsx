import { Outlet } from "react-router";
import { addAuthProvider } from "./auth-infra";
import { AuthByPassProvider } from "~/auth-by-pass/auth-by-pass";
import { Typography } from "@mui/material";
import { AuthByEmailProvider } from "~/auth-by-email/auth-by-email";
 "~/auth-by-email/auth-by-email";

export default function AuthRegistrator() {
    addAuthProvider("password", AuthByPassProvider);
    addAuthProvider("email", AuthByEmailProvider);
    return <Outlet />;
}
