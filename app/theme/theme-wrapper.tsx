import { ThemeProvider, createTheme } from "@mui/material/styles";
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
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#000',
          color: '#fff',
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#333',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          },
        },
        contained: {
          backgroundColor: '#000',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#333',
          },
        },
        text: {
          backgroundColor: '#000',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#333',
          },
        },
        outlined: {
          backgroundColor: '#000',
          color: '#fff',
          border: '1px solid #000',
          '&:hover': {
            backgroundColor: '#333',
            borderColor: '#000',
          },
        },
      },
    },        
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'black',
          '&.Mui-focused': {
            color: 'black',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'black',
          fontWeight: 400, // обычная (невыбранная) вкладка — тонкий шрифт
          '&.Mui-selected': {
            fontWeight: 600, // выбранная вкладка — полужирный
            color: 'black',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'black',
        },
      },
    },       
  },
});

type ThemeWrapperProps = {
  children?: React.ReactNode;
};

export default function ThemeWrapper(props: ThemeWrapperProps) {
  return (
    <ThemeProvider theme={scribeTheme}>
      <Outlet />
    </ThemeProvider>
  );
}
