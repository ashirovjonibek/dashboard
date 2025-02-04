import {IconComponent} from "../../icons/index.jsx";
import {Card} from "antd";

export const HeaderCardItem=({config})=>{
    return <Card style={{width:"100%",height:"100%"}} className={`shadow`} title={<h3>123</h3>}>
           <IconComponent iconId={1}/>
         </Card>
}