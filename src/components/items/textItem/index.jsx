import {Card, Input} from "antd";
import {useLayoutStore} from "../../../store/layoutStore.js";

export const TextItem = ({config}) => {
    const {setLayoutsData, layoutsData} = useLayoutStore()
    const setData = (value, key) => {
        setLayoutsData(config?.i, {
            ...layoutsData?.[config?.i],
            data: {
                ...(layoutsData?.[config?.i]?.data ?? {}),
                [key]: value
            }
        })
    }
    return <div className="p-2">
        <h4>
            {config?.data?.edit ?
                <Input value={config?.data?.label}
                       onChange={(e) => setData(e?.target?.value, "label")}/> : config?.data?.label ?? "Label"}
        </h4>
        <p>
            {config?.data?.edit ?
                <Input.TextArea value={config?.data?.text}
                                onChange={(e) => setData(e?.target?.value, "text")}/> : config?.data?.text ?? "Text"}
        </p>
    </div>
}