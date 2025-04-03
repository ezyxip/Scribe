import { Box, useTheme } from "@mui/material";

export type HorizontalScrollPanelProps = {
    children: React.ReactNode;
};

export function HorizontalScrollPanel(props: HorizontalScrollPanelProps) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexShrink: 0,
                gap: "1em",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: "left",
                maxHeight: "5em",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                overflowX: "auto",
                overflowY: "hidden",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                width: "100%",
            }}
        >
            {props.children}
        </Box>
    );
}
