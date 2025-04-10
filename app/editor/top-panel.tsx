import { type JSX } from "react";
import SlidePanel from "./slide-panel";
import { Box, Button, styled, useTheme } from "@mui/material";
import { HorizontalScrollPanel } from "./horizontal-scroll-panel";

type TopPanelProps = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    items: (() => JSX.Element)[];
};

export function TopPanel(props: TopPanelProps) {
    const theme = useTheme();

    return (
        <SlidePanel isOpen={props.isOpen} height="3em">
            <HorizontalScrollPanel>
                <TopPanelItem>
                    <Button
                        variant="contained"
                        onClick={() => props.onClose()}
                    >
                        Закрыть
                    </Button>
                </TopPanelItem>
                <TopPanelItem>
                    <Button variant="contained" onClick={props.onDelete}>Удалить</Button>
                </TopPanelItem>
                {props.items.map((item, i) => <TopPanelItem key={i}>{item()}</TopPanelItem>)}
            </HorizontalScrollPanel>
        </SlidePanel>
    );
}

const TopPanelItem = styled(Box)(({ theme }) => {
    return {
        maxHeight: "3em",
    };
});