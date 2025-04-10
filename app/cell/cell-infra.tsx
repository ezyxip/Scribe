import { createContext, useContext, type JSX } from "react";
import { Outlet } from "react-router";

export interface CellType {
    description: string;
    editorRenderer: (c: CellProps) => JSX.Element;
    veiwerRenderer: (c: CellProps) => JSX.Element;
    topPanelFilling: (c: CellProps) => JSX.Element[];
    defaultState: any;
}



type CellRegistrator =  {[name: string]: CellType}

export const CellContext = createContext<CellRegistrator>({});

const CellWrapper = () => {
    return (
        <CellContext.Provider value={{ }}>
            <Outlet />
        </CellContext.Provider>
    );
};

export default CellWrapper;

export const useCellTypes = () => useContext(CellContext);

export const addCellType = (name: string, cellType: CellType) => {
    const cellTypes = useCellTypes();
    cellTypes[name] = cellType
}

export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }


export type CellProps = {
    state: any;
    focus: boolean;
    changeState: (newContent: any) => void;
};