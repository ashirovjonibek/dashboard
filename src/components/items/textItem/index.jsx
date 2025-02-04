import {Card} from "antd";

export const TextItem = ({config}) => {
    console.log(config)
    return <h2 className="p-2">
        {config?.data?.text??"Text"}
    </h2>
}