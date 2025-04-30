import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Paper,
  useTheme,
  TextField,
} from "@mui/material";

// Возможные типы секций
const getSectionTypes = () => [
  { id: "text", label: "Текстовая секция" },
  { id: "image", label: "Изображение" },
  { id: "code", label: "Код" },
];

export function LowerSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  const filteredSections = getSectionTypes().filter((section) =>
    section.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (filteredSections.length === 0) {
      setActiveIndex(0);
    } else if (activeIndex >= filteredSections.length) {
      setActiveIndex(filteredSections.length - 1);
    }
  }, [searchTerm, filteredSections]);

  const scrollLeft = () => {
    if (filteredSections.length > 0) {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? filteredSections.length - 1 : prevIndex - 1
      );
    }
  };

  const scrollRight = () => {
    if (filteredSections.length > 0) {
      setActiveIndex((prevIndex) =>
        prevIndex === filteredSections.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      scrollLeft();
    } else {
      scrollRight();
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        maxWidth: "600px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: 3,
        borderRadius: 2,
        p: 1,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gridGap: "8px",
        alignItems: "center",
        overflow: "visible",
      }}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      {/* Поиск по секциям */}
      <TextField
        variant="outlined"
        placeholder="Поиск..."
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ 
          gridColumn: 1, 
          width: "100%",
        }}
      />

      {/* Кнопка "+" */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          gridColumn: 2,
          width: 64,
          height: 64,
          borderRadius: "50%",
          fontSize: "2rem",
          fontWeight: "bold",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: 3,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: 6,
          },
        }}
      >
        +
      </Button>

      {/* Карусель выбора секций */}
      {menuOpen && (
        <Paper
          sx={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: theme.palette.background.paper,
            boxShadow: 3,
            borderRadius: 1,
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "320px",
          }}
          onWheel={handleWheel}
        >
          <Button onClick={scrollLeft} sx={{ color: theme.palette.text.secondary }}>◄</Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "200px",
              height: "50px",
            }}
          >
            {filteredSections.length > 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  padding: "8px 4px",
                  cursor: "pointer",
                }}
              >
                {filteredSections[activeIndex].label}
              </Box>
            ) : (
              <Box>Нет результатов</Box>
            )}
          </Box>
          <Button onClick={scrollRight} sx={{ color: theme.palette.text.secondary }}>►</Button>
        </Paper>
      )}
    </Box>
  );
}