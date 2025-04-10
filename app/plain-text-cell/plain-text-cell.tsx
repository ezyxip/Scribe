import { Button, TextField, Typography } from "@mui/material";
import type { JSX } from "react";
import type { CellProps, CellType } from "~/cell/cell-infra";
import type { Cell } from "~/cell/cell-ui";

export function PlainTextViewer({ content }: { content: string }) {
    return <Typography>{content}</Typography>;
}

export function PlainTextEditor(props: CellProps) {
    if (props.focus) {
        return (
            <TextField
                value={props.state.content}
                onChange={(e) => props.changeState({ content: e.target.value })}
                multiline
                fullWidth
            />
        );
    } else {
        return <PlainTextViewer content={props.state.content} />;
    }
}

export function PlainTextTopPanel(props: CellProps) {
    return <>   </>;
}


export const PlainTextCellType: CellType = {
    description: "Simple plain text",
    editorRenderer: PlainTextEditor,
    veiwerRenderer: (c: CellProps) => PlainTextViewer(c.state.content),
    topPanelFilling: (c: CellProps) => [PlainTextTopPanel(c)], 
    defaultState: { content: "Plain text" },
}