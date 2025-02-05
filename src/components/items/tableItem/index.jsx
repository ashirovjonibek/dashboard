import {useInitialDataStore} from "../../../store/initialDataStore.js";

export const TableItem = ({config}) => {
    const {users} = useInitialDataStore();
    return <div
        className={`bg-light ${config?.data?.style?.shadow ? "shadow" : ""} ${config?.data?.style?.rounded ? "rounded" : ""}`}>
        <h3 className="p-2">{config?.data?.title ?? "Users"}</h3>
        <table style={{height: "100%"}} className="table m-0 p-0 table-bordered table-striped">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Username</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Web site</td>
                <td>Address</td>
            </tr>
            </thead>
            <tbody>
            {
                users?.map((user, index) => <tr key={index}>
                    <td>{user?.id}</td>
                    <td>{user?.name}</td>
                    <td>{user?.username}</td>
                    <td>{user?.email}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.website}</td>
                    <td>{user?.address?.street}, {user?.address?.suit},{user?.address?.city}</td>
                </tr>)
            }
            </tbody>
        </table>
    </div>
}