import { Box, Button, Paper, TextField, IconButton, Collapse } from "@mui/material";
import { useState } from "react";
import type { Cell } from "~/cell/cell-ui";
import { useCellTypes } from "~/cell/cell-infra";
import { toCell } from "~/cell/cell-ui";


export type BottomPanelProps = {
    addCell: (cell: Cell) => void;
};

export default function BottomPanel(props: BottomPanelProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const cellTypes = useCellTypes();

    const filteredCellTypes = Object.entries(cellTypes).filter(([name, cellType]) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            name.toLowerCase().includes(searchLower) ||
            cellType.description.toLowerCase().includes(searchLower)
        );
    });

    const toggleSearchPanel = () => {
        setIsSearchExpanded(!isSearchExpanded);
        if (isSearchExpanded) {
            setSearchQuery("");
        }
    };

    return (
        <>
            {/* Expanded search panel */}
            <Collapse in={isSearchExpanded} sx={{ position: "fixed", bottom: "5em", left: 0, width: "100%" }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        maxHeight: "50vh",
                        overflow: "auto",
                        mx: "auto",
                        width: "80%",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <TextField
                            label="Search cell types"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            fullWidth
                            autoFocus
                        />
                        <IconButton onClick={toggleSearchPanel} sx={{ ml: 1 }}>
                            Закрыть
                        </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {filteredCellTypes.map(([name, cellType]) => (
                            <Paper key={name} elevation={2} sx={{ p: 2, minWidth: "200px" }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => {
                                        props.addCell(toCell(cellType));
                                        toggleSearchPanel();
                                    }}
                                    sx={{ mb: 1 }}
                                >
                                    {name}
                                </Button>
                                <Box sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                                    {cellType.description}
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                </Paper>
            </Collapse>

            {/* Main bottom panel */}
            <Paper
                elevation={3}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "5em",
                    px: 2,
                }}
            >
                <IconButton onClick={toggleSearchPanel} sx={{ mr: 2 }}>
                    Найти
                </IconButton>

                <Box sx={{ display: "flex", overflowX: "auto", flexGrow: 1, gap: 1 }}>
                    {Object.entries(cellTypes).map(([name, cellType]) => (
                        <Button
                            variant="outlined"
                            key={name}
                            onClick={() => props.addCell(toCell(cellType))}
                            sx={{ flexShrink: 0 }}
                        >
                            {name}
                        </Button>
                    ))}
                </Box>
            </Paper>
        </>
    );
}