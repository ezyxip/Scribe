import { Box, Container, Paper, Typography } from "@mui/material";
import { useState } from "react";
import type { Cell } from "~/cell/cell-ui"

export type ViewerProps = {
    title: string,
    cells: Cell[]
}

export default function Viewer(props: ViewerProps) {
    const [commonState, setCommonState] = useState(props.cells.reduce((acc, cell) => {
        acc[cell.id] = cell.state;
        return acc
    }, {} as Record<string, any>));

    function getState(id: string) {
        return commonState[id];
    }
    function changeState(id: string, newContent: any) {
        setCommonState({...commonState, [id]: newContent});
    }
    return (
        <Container>
            <Box sx={{height: "3em"}}/>
            <Typography variant="h4">{props.title}</Typography>
            {props.cells.map((e) => (
                <Paper
                    sx={{ marginTop: 2, padding: 2 }}
                    key={e.id}
                >
                    <e.RenderInEditor
                        focus={false}
                        state={getState(e.id)}
                        changeState={(newContent: any) =>
                            changeState(e.id, newContent)
                        }
                    />
                </Paper>
            ))}
        </Container>
    );
}