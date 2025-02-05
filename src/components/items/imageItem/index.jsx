import {Image} from "antd";
import {useLayoutStore} from "../../../store/layoutStore.js";

export const ImageItem = ({config}) => {
    const {setLayoutsData} = useLayoutStore()

    return <img className="shadow rounded" width={"100%"} height={"100%"} src={
        config?.data?.src ?? "https://media.istockphoto.com/id/1324356458/vector/picture-icon-photo-frame-symbol-landscape-sign-photograph-gallery-logo-web-interface-and.jpg?s=612x612&w=0&k=20&c=ZmXO4mSgNDPzDRX-F8OKCfmMqqHpqMV6jiNi00Ye7rE="
    } alt={"img"}/>
}