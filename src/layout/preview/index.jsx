import RGL, {WidthProvider} from "react-grid-layout";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Layout, message, theme} from "antd";
import {useLayoutStore} from "../../store/layoutStore.js";
import {GetItemById} from "../../components/items/index.jsx";
import {ArrowLeftOutlined} from "@ant-design/icons";

const ReactGridLayout = WidthProvider(RGL);

const {Header} = Layout;
export const PreviewDashboard = () => {
    const {id} = useParams();
    const {
        gridLayouts,
        onLayoutChange,
        setAllLayoutsData
    } = useLayoutStore();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();
    const [name, setName] = useState({text: "Dashboard", edit: false});

    useEffect(() => {
        if (id && id !== "local") {
            (
                async () => {
                    try {
                        let resp = await fetch("http://localhost:3000/get/" + id);
                        let data = await resp.json();
                        setAllLayoutsData(data?.data?.layoutsData);
                        onLayoutChange(data?.data?.gridLayouts);
                        setName({...name, text: data?.data?.name})
                    } catch (e) {
                        console.log(e);
                        message.error("Error")
                    }
                }
            )()
        }
    }, [id])

    return <Layout>
        <Layout>
            <Header className={"d-flex justify-content-center align-items-center"}
                    style={{
                        position: "relative",
                        padding: 0,
                        background: colorBgContainer
                    }}
            >
                <span className={"cursor-pointer"} style={{position: "absolute", left: 15}} onClick={() => {
                    navigate("/" + (id === "local" ? "" : id))
                }}><ArrowLeftOutlined/></span>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <h3>{name?.text}</h3>
                </div>
            </Header>
        </Layout>
        <ReactGridLayout
            className="layout"
            layout={gridLayouts}
            measureBeforeMount={false}
            cols={48}
            style={{width: "100%", height: "87vh"}}
            rowHeight={20}
            width={"100%"}
            height={"87vh"}
            useCSSTransforms={true}
            compactType={"vertical"}
            isResizable={false}
            isDraggable={false}
            isDroppable={false}
        >
            {
                gridLayouts?.map(l => {
                    return <div style={{overflow: "hidden", position: "relative", zIndex: 1}} key={l?.i}
                                className="shadow rounded">
                        <GetItemById i={l?.i}/>
                    </div>
                })
            }
        </ReactGridLayout>
    </Layout>
}