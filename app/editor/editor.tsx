import { Box, Container, Grid2, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { TopPanel } from "./top-panel";
import type { Cell } from "~/cell/cell-ui";
import BottomPanel from "./bottom-panel";

export type EditorProps = {
    title: string;
    setTitle: (newTitle: string) => void;
    cells: Cell[];
    deleteCell(id: string): void;
    addCell(cell: Cell, index: number): void;
};

export function Editor({
    title,
    setTitle,
    cells,
    deleteCell,
    addCell,
}: EditorProps) {
    const [cellsState, setCellsState] = useState(cells);

    const commonState = cellsState.reduce((acc, cell) => {
        acc[cell.id] = cell.state;
            return acc;
        }, {} as Record<string, any>)

    let addCellHandler = (cell: Cell, index: number) => {
        const newCells = [...cellsState];
        newCells.splice(index, 0, cell);
        setCellsState(newCells);
        addCell(cell, index);
    };

    let deleteCellHandler = (id: string) => {
        const newCells = cellsState.filter((e) => e.id !== id);
        setCellsState(newCells);
        setFocus(null);
        deleteCell(id);
    };

    const [focus, setFocus] = useState<string | null>(null);
    // const [isPanelOpen, setIsPanelOpen] = useState(false);
    const isPanelOpen: boolean = focus != null;
    const setIsPanelOpen = (b: boolean) => {
        if (!b) {
            setFocus(null);
        }
    };

    let panel;
    if (focus != null) {
        let cell = cells.find((e) => e.id === focus)!;
        console.log(cell);
        console.log(focus);
        panel = (
            <TopPanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                onDelete={() => deleteCellHandler(focus)}
                items={[
                    ...cell
                        .TopPanelFilling({
                            state: getState(focus),
                            focus: true,
                            changeState: (newContent: any) =>
                                changeState(focus!, newContent),
                        })
                        .map((e) => () => e),
                ]}
            />
        );
    } else {
        panel = (
            <TopPanel
                items={[]}
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                onDelete={() => {}}
            />
        );
    }

    const handleOpenPanel = () => {
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
    };
    function getState(id: string) {
        return commonState[id];
    }

    function changeState(id: string, newContent: any) {
        setCellsState(
            cellsState.map((e) => {
                if (e.id === id) {
                    return { ...e, state: newContent };
                }
                return e;
            })
        );
    }

    function onCellClickHandler(id: string) {
        setFocus(id);
    }
    return (
        <Container>
            {panel}
            <Box sx={{height: "3em"}}/>
            <TextField
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {cells.map((e) => (
                <Paper
                    sx={{ marginTop: 2, padding: 2 }}
                    key={e.id}
                    onClick={() => onCellClickHandler(e.id)}
                >
                    <e.RenderInEditor
                        focus={e.id === focus}
                        state={getState(e.id)}
                        changeState={(newContent: any) =>
                            changeState(e.id, newContent)
                        }
                    />
                </Paper>
            ))}
            <Box sx={{height: "50vh"}}/>
            <BottomPanel addCell={(c: Cell) => addCellHandler(c, cells.length)} />
        </Container>
    );
}
