import {iconsJson} from "./iconsJson.js";

export const RenderComponent = ({Component, config}) => {
    return <Component {...config}/>
}

export const IconComponent = ({iconId, config = {}}) => {

    return <RenderComponent config={config} Component={iconsJson?.[iconId]}/>
}