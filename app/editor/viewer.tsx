import { Box, Container, Grid2, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useCellTypes } from "~/cell/cell-infra";
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

export const ViewerPreview = () => {
    const [title, setTitle] = useState("New notebook!");
    const cellTypes = useCellTypes();
    const plainText = cellTypes["plain-text"];
    const richText = cellTypes["rich-text"];

const cell1: Cell = {
    id: "1",
    RenderInEditor: plainText.editorRenderer,
    RenderInViewer: plainText.veiwerRenderer,
    TopPanelFilling: plainText.topPanelFilling,
    state: plainText.defaultState,
};

    const cell2: Cell = {
        id: "2",
        RenderInEditor: plainText.editorRenderer,
        RenderInViewer: plainText.veiwerRenderer,
        TopPanelFilling: plainText.topPanelFilling,
        state: plainText.defaultState,
    };

    const cell3: Cell = {
        id: "3",
        RenderInEditor: richText.editorRenderer,
        RenderInViewer: richText.veiwerRenderer,
        TopPanelFilling: richText.topPanelFilling,
        state: richText.defaultState,
    };
    const [cells, setCells] = useState<Cell[]>([cell1, cell2, cell3]);
    return (
        <Grid2 container spacing={2} justifyContent={"center"}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
                <Viewer title={title} cells={cells} />
            </Grid2>
        </Grid2>
    );
}