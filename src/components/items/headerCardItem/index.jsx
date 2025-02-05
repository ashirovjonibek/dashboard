import {IconComponent, RenderComponent} from "../../icons/index.jsx";
import {Card, Input, Select} from "antd";
import {iconsJson} from "../../icons/iconsJson.js";
import {useLayoutStore} from "../../../store/layoutStore.js";

export const HeaderCardItem = ({config}) => {
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
    return <Card style={{
        width: "100%",
        height: "100%",
        background: config?.style?.background ?? "",
        color: config?.style?.color ?? ""
    }} className={`shadow`}
                 title={
                     <h3 style={{color: config?.style?.color ?? ""}}
                         className="d-flex justify-content-between align-items-center">
                         <div>{config?.data?.edit ? <Input  value={config?.data?.title}
                             onChange={(e) => setData(e?.target?.value, "title")}/> : config?.data?.title ?? "header card"}</div>
                         {
                             config?.data?.edit ? <Select value={config?.data?.icon} onChange={(e) => setData(e, "icon")} style={{width: "50px"}}
                                                          options={Object.entries(iconsJson).map(([id, img]) => {
                                                              return {
                                                                  label: <RenderComponent Component={img}/>,
                                                                  value: id
                                                              }
                                                          })}
                             /> : <IconComponent iconId={config?.data?.icon ?? 8}/>
                         }
                     </h3>
                 }
    >
        <div style={{fontSize: config?.style?.fontSize ?? "15px"}}
             className="d-flex justify-content-between align-items-center">
            <strong>{config?.data?.edit ?
                <Input onChange={(e) => setData(e?.target?.value, "valueName")} style={{width: "100px"}}
                       value={config?.data?.valueName}/> : config?.data?.valueName ?? "Amount"}: </strong>
            <span>{config?.data?.edit ?
                <Input style={{width: "60px"}} onChange={(e) => setData(e?.target?.value, "amount")}
                       value={config?.data?.amount}/> : config?.data?.amount ?? 0}</span>
        </div>
    </Card>
}