import type { JSX } from "@emotion/react/jsx-runtime"

export interface NotebookEntity extends NotebookValue{
    id: string
}

export interface NotebookValue {
    title: string,
    desctiprion: string
}

export type CollectionProps = {
    notebooks: NotebookEntity[],
    createNotebook: (n: NotebookValue) => void,
    removeNotebook: (notebookId: string) => void,
    deleteNotebook: (notebookId: string) => void,
    updateNotebook: (n: NotebookEntity) => void
}

export type CollectionType = {
    title: string,
    render: (c: CollectionProps) => JSX.Element
}