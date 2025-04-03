import type { EmotionJSX as JSX } from "node_modules/@emotion/react/dist/declarations/src/jsx-namespace";
import { type CellProps, type CellType, uuidv4 } from "./cell-infra";

export interface Cell {
    id: string;
    RenderInEditor(props: CellProps): JSX.Element;
    RenderInViewer(props: CellProps): JSX.Element;
    TopPanelFilling(props: CellProps): JSX.Element[];
    state: any;
}

export function toCell(type: CellType): Cell {
    return {
        id: uuidv4(),
        RenderInEditor: type.editorRenderer,
        RenderInViewer: type.veiwerRenderer,
        TopPanelFilling: type.topPanelFilling,
        state: type.defaultState,
    };
}
