import {List, Tag} from "antd";
import {useInitialDataStore} from "../../../store/initialDataStore.js";

export const ListItem = ({config}) => {
    const {todos, users} = useInitialDataStore();
    return <List style={{height: "100%"}} className="p-2 shadow">
        <h3>Todos</h3>
        {
            todos?.map((t, index) => <List.Item key={index}>
                <div style={{width: "100%"}}>
                    <strong>
                        {t?.title}
                    </strong>
                    <div className="d-flex justify-content-between">
                        <span>
                        {users?.find(u => u?.id === t?.userId)?.name}
                    </span>
                        <span>
                        {
                            t?.completed ? <Tag color="green">Completed</Tag> : <Tag color="warning">Not completed</Tag>
                        }
                    </span>
                    </div>
                </div>
            </List.Item>)
        }
    </List>
}