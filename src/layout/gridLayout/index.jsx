import RGL, {WidthProvider} from "react-grid-layout";
import {useLayoutStore} from "../../store/layoutStore.js";
import {Card, Dropdown} from "antd";
import {useState} from "react";
import {IconComponent} from "../../components/icons/index.jsx";
import log from "eslint-plugin-react/lib/util/log.js";
import {GetItemById} from "../../components/items/index.jsx";
import {BarChartOutlined, CopyOutlined, DeleteOutlined, RadarChartOutlined, SettingOutlined} from "@ant-design/icons";

const ReactGridLayout = WidthProvider(RGL);
const ItemType = {BOX: "box"};

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

    console.log(gridLayouts, layoutsData)

    return <div style={{width: "100%"}}>
        <ReactGridLayout
            onLayoutChange={(a) => {
                onLayoutChange(a?.filter(l => l?.i !== "__dropping-elem__"))
            }}
            className="layout"
            layout={gridLayouts}
            measureBeforeMount={false}
            cols={48}
            style={{width: "100%", height: "88vh"}}
            rowHeight={20}
            onDrop={onDrop}
            width={"100%"}
            height={"88vh"}
            useCSSTransforms={true}
            compactType={"vertical"}
            isResizable={true}
            isDraggable={true}
            isDroppable={true}
        >
            {
                gridLayouts?.map(l => {
                    console.log(l?.w)
                    return <div style={{overflow: "hidden", position: "relative"}} className="shadow" key={l?.i}>
                        <span style={{width: "20px", position: "absolute", right: "10px", top: "5px", zIndex: 10}}>
                            <span
                                className="d-flex ps-3 rounded cursor-pointer justify-content-center align-items-center bg-light">
                                <Dropdown
                                    trigger={["hover"]}
                                    menu={{
                                        items: [
                                            {
                                                label: "Settings",
                                                icon: <SettingOutlined/>,
                                                key: "settings",
                                                onClick: () => setConfig({id: l?.i, open: false})
                                            },
                                            {
                                                label: "Duplicate",
                                                icon: <CopyOutlined/>,
                                                key: "duplicate",
                                                onClick: () => {
                                                    console.log({
                                                        i: lastId?.toString(),
                                                        w: l?.w,
                                                        h: l?.h,
                                                        y: l?.y + l?.h,
                                                        x: l?.x
                                                    })
                                                    addGridLayout({
                                                        i: lastId?.toString(),
                                                        w: l?.w,
                                                        h: l?.h,
                                                        y: l?.y + l?.h,
                                                        x: l?.x
                                                    }, layoutsData?.[l?.i]?.type)
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