import 'antd/dist/reset.css'
import 'bootstrap/dist/css/bootstrap.css'
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ComponentLayout from "./layout/componentLayout/index.jsx";
import {useInitialDataStore} from "./store/initialDataStore.js";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {Result} from "antd";
import {PreviewDashboard} from "./layout/preview/index.jsx";

function App() {
    const {initData} = useInitialDataStore()
    useEffect(() => {
        initData().then();
    }, [])

    return (
        <Routes>
            <Route element={<ComponentLayout/>} path={"/"}/>
            <Route element={<ComponentLayout/>} path={"/:id"}/>
            <Route element={<PreviewDashboard/>} path={"/preview/:id"}/>
            <Route element={<Result status={404} title={"Page not found!"}/>} path={"*"}/>
        </Routes>
    )
}

export default App
