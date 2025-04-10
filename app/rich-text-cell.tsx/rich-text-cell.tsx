import {
    Button,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import type { CellProps, CellType } from "~/cell/cell-infra";

export function RichTextCellViewer({
    content,
    aligment,
    isBold,
}: {
    content: string;
    aligment: "left" | "right" | "center";
    isBold: boolean;
}) {
    return (
        <Typography
            align={aligment}
            fontWeight={isBold ? "bold" : "normal"}
            variant="body1"
        >
            {content}
        </Typography>
    );
}

export function RichTextCellEditor(props: CellProps) {
    if (props.focus) {
        return (
            <TextField
                value={props.state.content}
                onChange={(e) => props.changeState({ ...props.state, content: e.target.value })}
                sx={{
                    "& .MuiInputBase-input": {
                        textAlign: props.state.aligment,
                        fontWeight: props.state.isBold ? "bold" : "normal",
                    },
                }}
                multiline
                fullWidth
            />
        );
    } else {
        return (
            <RichTextCellViewer
                content={props.state.content}
                aligment={props.state.aligment}
                isBold={props.state.isBold}
            />
        );
    }
}

export function RichTextCellTopPanel(props: CellProps) {
    function onClickHandler(value: string) {
        props.changeState({ ...props.state, aligment: value });
    }
    return [
        <ToggleButtonGroup>
            <ToggleButton value="left" onClick={() => onClickHandler("left")}>
                <Button variant="text">Лево</Button>
            </ToggleButton>
            <ToggleButton
                value="center"
                onClick={() => onClickHandler("center")}
            >
                <Button variant="text">Центр</Button>
            </ToggleButton>
            <ToggleButton value="right" onClick={() => onClickHandler("right")}>
                <Button variant="text">Право</Button>
            </ToggleButton>
        </ToggleButtonGroup>,
        <ToggleButton value={"bold"} onClick={() => props.changeState({ ...props.state, isBold: !props.state.isBold })}>
            <Button variant="text">Жирный</Button>
        </ToggleButton>
    ];
}


export const RichTextCellType: CellType = {
    description: "Rich text",
    editorRenderer: RichTextCellEditor,
    veiwerRenderer: (c: CellProps) => RichTextCellViewer({
        content: c.state.content,
        aligment: c.state.aligment,
        isBold: c.state.isBold
    }),
    topPanelFilling: RichTextCellTopPanel,
    defaultState: {
        content: "Rich text",
        aligment: "left",
        isBold: false
    }
};