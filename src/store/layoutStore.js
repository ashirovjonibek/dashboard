import {create} from "zustand";

export const useLayoutStore = create((set, get) => ({
    componentLayouts: {
        open: true,
        templates: [
            {
                type: "chart",
                name: "Chart",
                icon: 2,
                w: 18,
                h: 10,
            },
            {
                type: "image",
                name: "Image",
                icon: 3,
                w: 5,
                h: 5,
            },
            {
                type: "list",
                name: "List",
                icon: 4
            },
            {
                type: "table",
                name: "Table",
                w: 10,
                h: 3,
                icon: 5
            },
            {
                type: "text",
                name: "Text",
                icon: 6,
                w: 48,
                h: 5,
            },
            {
                type: "headerCard",
                name: "Header card",
                icon: 7,
                w: 12,
                h: 4,
            }
        ]
    },
    gridLayouts: [
        {i: "1", x: 0, y: 0, w: 10, h: 3},
        {i: "2", x: 10, y: 0, w: 10, h: 3},
    ],
    layoutsData: {
        "1": {
            type: "table"
        },
        "2": {
            type: "table"
        }
    },
    lastId: 3,
    draggableElType: null,
    config: {
        open: true,
        id: null
    },
    setConfig: ({id, open}) => set(() => ({
        config: {
            id, open
        }
    })),
    removeGridLayout: (id) => set(() => ({gridLayouts: get().gridLayouts?.filter(l => l?.i !== id)})),
    setDraggableElType: (type) => set(() => ({draggableElType: type})),
    onLayoutChange: (layouts) => set(() => ({gridLayouts: layouts?.length > 0 ? layouts : get().gridLayouts})),
    addGridLayout: (layout, type) => set(() => ({
        gridLayouts: [...get().gridLayouts, layout],
        lastId: get()?.lastId + 1,
        layoutsData: {
            ...get()?.layoutsData,
            [layout?.i]: {
                ...(get()?.layoutsData?.[layout?.i] ?? {}),
                type
            }
        }
    })),
    setLayoutsData: (i, value = {}) => set(() => ({
        layoutsData: {
            ...get()?.layoutsData,
            [i]: {
                ...(get()?.layoutsData?.[i] ?? {}),
                ...value
            }
        }
    })),
    setComponentLayout: (config) => set(() => ({...get()?.componentLayouts, ...config}))

}))