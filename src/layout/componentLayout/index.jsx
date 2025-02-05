import React, {useEffect, useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Button, Input, Layout, message, Spin, theme} from 'antd';
import {GridLayout} from "../gridLayout/index.jsx";
import {useLayoutStore} from "../../store/layoutStore.js";
import {IconComponent} from "../../components/icons/index.jsx";
import {useNavigate, useParams} from "react-router-dom";

const {Header, Sider, Content} = Layout;
const ComponentLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {id} = useParams()
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const {
        componentLayouts,
        addGridLayout,
        setDraggableElType,
        lastId,
        gridLayouts,
        layoutsData,
        onLayoutChange,
        setAllLayoutsData
    } = useLayoutStore();
    const navigate = useNavigate();
    const [name, setName] = useState({text: "Dashboard", edit: false});
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (id) {
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
    }, [id, refresh])

    const save = async () => {
        try {
            setLoading(true)
            let resp = await fetch('http://localhost:3000/save', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...(id ? {id} : {}),
                    name: name?.text,
                    gridLayouts, layoutsData
                })
            });
            let data = await resp.json();
            message.success(data.message);
            setLoading(false);
            setRefresh(!refresh)
        } catch (e) {
            setLoading(false)
            console.log(e);
            message.error("Error!")
        }
    }
    return (
        <Spin spinning={loading}>
            <Layout>
                <Sider trigger={null} collapsedWidth={0} collapsible collapsed={collapsed} className="mx-1"
                       style={{height: "99vh"}}>
                    <div className="demo-logo-vertical mt-4"/>
                    <div>
                        {
                            componentLayouts?.templates?.map((c, index) => {
                                return <div className="element-hover p-2 rounded-2 mx-3 my-3 text-light"
                                            style={{fontSize: "18px"}}
                                            key={index}>
                                    <div id={c?.type} onClick={() => {
                                        addGridLayout(
                                            {i: lastId.toString(), x: 4, y: 0, w: c?.w ?? 4, h: c?.h ?? 2},
                                            c?.type
                                        )
                                    }} className={"droppable-element"}
                                         datatype={c?.type}
                                         onDragStart={e => {
                                             e.dataTransfer.setData("text/plain", "")
                                             setDraggableElType(c)
                                         }} unselectable="on"
                                         draggable={true}>
                                        <IconComponent iconId={c?.icon}/> {c?.name}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <div className={"d-flex justify-content-between align-items-center"}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <h3>{name?.edit ? <Input value={name?.text} onChange={(e) => setName({
                                ...name,
                                text: e?.target?.value
                            })}/> : name?.text}</h3>
                            <div>
                                <Button onClick={() => setName({...name, edit: !name?.edit})}>Edit name</Button>
                                <Button className={"mx-2"}
                                        onClick={() => navigate("/preview/" + (id ?? "local"))}>Preview</Button>
                                <Button onClick={save} type="primary" className="me-2">Save</Button>
                            </div>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '14px 10px',
                            padding: 10,
                            minHeight: 280,
                            maxHeight: "88vh",
                            overflow: "auto",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <GridLayout/>
                    </Content>
                </Layout>
            </Layout>
        </Spin>
    );
};
export default ComponentLayout;