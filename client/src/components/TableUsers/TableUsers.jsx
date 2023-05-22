// Hooks
import { useEffect, useState } from "react";

// Services
import { fetchUsers } from "../../services/UserService";

// Components
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const TableUsers = ({ props }) => {
    const columns = [ "ID", "Email", "First name", "Last name" ];
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        getUsersByPage(2);
    }
    , []);

    const getUsersByPage = async (page = 1) => {
        let res = await fetchUsers(page);

        if (res && res.data) {
            setUsers(res.data);
        }
    }

    return (
        <div className="table-users-container">
            <Table striped hover responsive>
                <thead>
                    <tr>
                        { Array.from({ length: columns.length }).map((_, index) => (
                                <th key={ index }>
                                    { columns[index] }
                                </th>
                        )) }
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.length > 0 &&
                        users.map((user, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td> {user.id} </td>
                                    <td> {user.email} </td>
                                    <td> {user.first_name} </td>
                                    <td> {user.last_name} </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default TableUsers;