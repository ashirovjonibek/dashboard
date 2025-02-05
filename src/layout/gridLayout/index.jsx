import RGL, {WidthProvider} from "react-grid-layout";
import {useLayoutStore} from "../../store/layoutStore.js";
import {Dropdown} from "antd";
import {GetItemById} from "../../components/items/index.jsx";
import {
    BarChartOutlined,
    CopyOutlined,
    DeleteOutlined, EditOutlined,
    RadarChartOutlined,
    SettingOutlined,
    UploadOutlined
} from "@ant-design/icons";

const ReactGridLayout = WidthProvider(RGL);

export const GridLayout = () => {
    const {
        gridLayouts,
        layoutsData,
        setConfig,
        addGridLayout,
        lastId,
        setLayoutsData,
        draggableElType,
        onLayoutChange,
        removeGridLayout
    } = useLayoutStore();

    const onDrop = (layouts, layoutItem, _event) => {
        console.log(_event, layoutItem)
        addGridLayout({
            x: layoutItem?.x,
            y: layoutItem?.y,
            w: draggableElType?.w ?? 4,
            h: draggableElType?.h ?? 4,
            i: lastId?.toString(),
        }, draggableElType?.type)
    };

    const convertToBase64 = (file, i) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            console.log('called: ', reader);
            setLayoutsData(i, {
                ...layoutsData?.[i],
                data: {
                    src: reader?.result
                }
            })
        }
    }

    const openDialog = (i) => {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            let files = e.target?.files;
            if (files?.length) {
                convertToBase64(files?.[0], i)
            }
        }
        input.click();
        input.remove();
    }

    return <div style={{width: "100%"}}>
        <ReactGridLayout
            onLayoutChange={(a) => {
                onLayoutChange(a?.filter(l => l?.i !== "__dropping-elem__"))
            }}
            className="layout"
            layout={gridLayouts}
            measureBeforeMount={false}
            cols={48}
            style={{width: "100%", height: "87vh"}}
            rowHeight={20}
            onDrop={onDrop}
            width={"100%"}
            height={"87vh"}
            useCSSTransforms={true}
            compactType={"vertical"}
            isResizable={true}
            isDraggable={true}
            isDroppable={true}
        >
            {
                gridLayouts?.map(l => {
                    console.log(l?.w)
                    return <div style={{overflow: "hidden", position: "relative", zIndex: 1}} key={l?.i}
                                className="shadow rounded">
                        <span style={{width: "20px", position: "absolute", right: "2px", top: "2px", zIndex: 10}}>
                            <span
                                className="d-flex ps-3 rounded cursor-pointer justify-content-center align-items-center bg-light">
                                <Dropdown
                                    trigger={["hover"]}
                                    menu={{
                                        items: [
                                            {
                                                label: "Duplicate",
                                                icon: <CopyOutlined/>,
                                                key: "duplicate",
                                                onClick: () => {
                                                    addGridLayout({
                                                        i: lastId?.toString(),
                                                        w: l?.w,
                                                        h: l?.h,
                                                        y: l?.y + l?.h,
                                                        x: l?.x
                                                    }, layoutsData?.[l?.i]?.type);
                                                    setLayoutsData(lastId?.toString(), layoutsData?.[l?.i])
                                                }
                                            },
                                            ...(layoutsData?.[l?.i]?.type === "chart" ? [
                                                {
                                                    label: "Chart types",
                                                    icon: <RadarChartOutlined/>,
                                                    children: [
                                                        {
                                                            label: "Bar",
                                                            icon: <BarChartOutlined/>,
                                                            onClick: () => setLayoutsData(l?.i, {
                                                                chart: {
                                                                    type: "bar"
                                                                }
                                                            })
                                                        },
                                                        {
                                                            label: "Line",
                                                            icon: <BarChartOutlined/>,
                                                            onClick: () => setLayoutsData(l?.i, {
                                                                chart: {
                                                                    type: "line"
                                                                }
                                                            })
                                                        },
                                                        {
                                                            label: "Pie",
                                                            icon: <BarChartOutlined/>,
                                                            onClick: () => setLayoutsData(l?.i, {
                                                                chart: {
                                                                    type: "pie"
                                                                }
                                                            })
                                                        }
                                                    ]
                                                }
                                            ] : []),
                                            ...(layoutsData?.[l?.i]?.type === "image" ? [
                                                {
                                                    label: "Upload img",
                                                    icon: <UploadOutlined/>,
                                                    onClick: () => openDialog(l?.i)
                                                }
                                            ] : []),
                                            ...(layoutsData?.[l?.i]?.type === "text" || layoutsData?.[l?.i]?.type === "headerCard" ? [
                                                {
                                                    label: "Is edit: " + (layoutsData?.[l?.i]?.data?.edit ? "yes" : "no"),
                                                    icon: <EditOutlined/>,
                                                    onClick: () => setLayoutsData(l?.i, {
                                                        ...layoutsData?.[l?.i],
                                                        data: {
                                                            ...(layoutsData?.[l?.i]?.data ?? {}),
                                                            edit: !layoutsData?.[l?.i]?.data?.edit
                                                        }
                                                    })
                                                }
                                            ] : []),
                                            {
                                                label: "Delete",
                                                icon: <DeleteOutlined/>,
                                                key: "delete",
                                                onClick: () => removeGridLayout(l?.i)
                                            }
                                        ]
                                    }}
                                >
                                    <span style={{transform: "rotate(90deg)", fontSize: "25px"}}>...</span>
                                </Dropdown>
                            </span>
                        </span>
                        <GetItemById i={l?.i}/>
                    </div>
                })
            }
        </ReactGridLayout>
    </div>

}