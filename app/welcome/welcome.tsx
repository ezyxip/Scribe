import { Container, Box, Typography, CircularProgress, Button } from "@mui/material";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";



export function Welcome() {
  return (
    <Container maxWidth="md">
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

        {/* Уведомление о разработке */}
        <Box
          sx={{
            marginTop: 4,
            padding: 3,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            paragraph
          >
            🚧 Сервис находится в стадии активной разработки. Следите за
            обновлениями!
          </Typography>
          <CircularProgress size={24} sx={{ marginTop: 2 }} />
        </Box>

        {/* Кнопка для подписки на обновления */}
        <Box sx={{ marginTop: 4 }}>
          <Button
            variant="contained"
            size="large"
            disabled // Кнопка пока неактивна
          >
            Уведомить о запуске
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
