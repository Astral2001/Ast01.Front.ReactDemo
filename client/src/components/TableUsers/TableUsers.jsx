// Components
import { Table } from "react-bootstrap";

const TableUsers = ({ users }) => {
    
    return (
        <div className="table-users-container">
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <th key={index}>Table heading</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>2</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default TableUsers;