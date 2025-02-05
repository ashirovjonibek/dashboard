import {useLayoutStore} from "../../store/layoutStore.js";
import {TableItem} from "./tableItem/index.jsx";
import {TextItem} from "./textItem/index.jsx";
import {ListItem} from "./listItem/index.jsx";
import {ChartItem} from "./chartItem/index.jsx";
import {ImageItem} from "./imageItem/index.jsx";
import {HeaderCardItem} from "./headerCardItem/index.jsx";

export const GetItemById = ({i}) => {
    const {layoutsData} = useLayoutStore();
    if (layoutsData?.[i]?.type === "table") {
        return <TableItem config={{...layoutsData?.[i], i}}/>
    } else if (layoutsData?.[i]?.type === "chart") {
        return <ChartItem config={{...layoutsData?.[i], i}}/>
    } else if (layoutsData?.[i]?.type === "list") {
        return <ListItem config={{...layoutsData?.[i], i}}/>
    } else if (layoutsData?.[i]?.type === "text") {
        return <TextItem config={{...layoutsData?.[i], i}}/>
    } else if (layoutsData?.[i]?.type === "image") {
        return <ImageItem config={{...layoutsData?.[i], i}}/>
    } else if (layoutsData?.[i]?.type === "headerCard") {
        return <HeaderCardItem config={{...layoutsData?.[i], i}}/>
    } else return null;
}