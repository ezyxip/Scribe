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

    const textStyle = {
        color: "black",
        fontWeight: "medium",
        textTransform: "none",
    };

    return [
        <ToggleButtonGroup key="align-group">
            <ToggleButton value="left" onClick={() => onClickHandler("left")}>
                <Typography sx={textStyle}>Лево</Typography>
            </ToggleButton>
            <ToggleButton value="center" onClick={() => onClickHandler("center")}>
                <Typography sx={textStyle}>Центр</Typography>
            </ToggleButton>
            <ToggleButton value="right" onClick={() => onClickHandler("right")}>
                <Typography sx={textStyle}>Право</Typography>
            </ToggleButton>
        </ToggleButtonGroup>,
        <ToggleButton
            key="bold-toggle"
            value="bold"
            onClick={() =>
                props.changeState({
                    ...props.state,
                    isBold: !props.state.isBold,
                })
            }
        >
            <Typography sx={textStyle}>Жирный</Typography>
        </ToggleButton>,
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