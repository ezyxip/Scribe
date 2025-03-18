import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";



export function Welcome() {
  return (
    <Container 
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Растягиваем контейнер на всю высоту экрана
      }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Логотип или заголовок */}
        <Typography variant="h2" component="h1" gutterBottom>
          Добро пожаловать в Scribe!
        </Typography>

        {/* Краткое описание сервиса */}
        <Typography variant="h5" component="p" color="text.secondary" paragraph>
          Scribe — это ваш помощник в создании и управлении контентом. Мы
          работаем над тем, чтобы сделать процесс максимально удобным и
          эффективным.
        </Typography>

        {/* Кнопка для создания документа */}
        <Box sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/document"
          sx={{
            backgroundColor: "black",
            color: "white",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#1c1c1c",
              boxShadow: 6,
            },
          }}
        >
          Перейти к созданию документа
        </Button>
        </Box>
      </Box>
    </Container>
  );
}
