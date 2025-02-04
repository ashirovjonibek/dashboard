import React, {useState} from 'react';
import {
    CloseCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd';
import {GridLayout} from "../gridLayout/index.jsx";
import {useLayoutStore} from "../../store/layoutStore.js";
import {IconComponent} from "../../components/icons/index.jsx";

const {Header, Sider, Content} = Layout;
const ComponentLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const {componentLayouts, addGridLayout, setDraggableElType, lastId, config, setConfig} = useLayoutStore();
    return (
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
            <Sider style={{overflow: "hidden"}} collapsed={config?.open} collapsedWidth={0} width={"300px"}
                   theme={"light"}>
                <div style={{height: "98vh"}} className="border rounded">
                    <div className="p-2 border d-flex align-items-center">
                        <CloseCircleOutlined className="cursor-pointer"
                                             onClick={() => setConfig({id: null, open: true})}
                                             style={{fontSize: "25px", color: "red"}}/>
                        <h2 className="ms-2">Settings</h2>
                    </div>
                </div>
            </Sider>
        </Layout>
    );
};
export default ComponentLayout;