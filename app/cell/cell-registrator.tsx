import { createContext } from "react"
import { addCellType, type CellType } from "./cell-infra"
import { Outlet } from "react-router"
import { PlainTextCellType } from "~/plain-text-cell/plain-text-cell"
import { RichTextCellType } from "~/rich-text-cell.tsx/rich-text-cell"

const CellRegistrator = () => {
    addCellType("plain-text",PlainTextCellType);
    addCellType("rich-text", RichTextCellType)

    return <Outlet />
}

export default CellRegistrator;