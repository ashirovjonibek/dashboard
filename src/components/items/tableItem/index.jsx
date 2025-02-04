export const TableItem = ({config}) => {
    console.log(config)
    return <table style={{height:"100%"}} className="table table-bordered table-striped">
            <thead>
            <tr>
                <td>name1</td>
                <td>name2</td>
                <td>name3</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>value1</td>
                <td>value2</td>
                <td>value3</td>
            </tr>
            </tbody>
        </table>
}