import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Outlet } from "react-router";

let scribeTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#41bdf7',
          light: '#8ad8fa',
        },
        secondary: {
          main: '#f77a41',
        },
      },
})

type ThemeWrapperProps = {
    children: React.ReactNode
}

export default function ThemeWrapper(props: ThemeWrapperProps){
    return (
        <ThemeProvider theme={scribeTheme}>
            <Outlet />
        </ThemeProvider>
    )
}