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
    const [ totalPages, setTotalPages ] = useState(0);
    const [ totalUsers, setTotalUsers ] = useState(0);

    useEffect(() => {
        getPaginationData();
        getUsersByPage();
    }
    , []);

    const getUsersByPage = async (page = 1) => {
        let res = await fetchUsers(page);

        if (res && res.data) {
            setUsers(res.data);
        }
    }

    const getPaginationData = async () => {
        let res = await fetchUsers();

        if (res && res.data) {
            setTotalPages(res.total_pages);
            setTotalUsers(res.total);
        }
    }

    const handlePageClick = ( event ) => {
        getUsersByPage(event.selected + 1);
    }

    return (
        <div className="table-users-container">
            <Table striped hover responsive>
                <thead>
                    <tr>
                        {
                            Array.from({ length: columns.length }).map((_, index) => (
                                <th key={ index }>
                                    { columns[index] }
                                </th>
                            ))
                        }
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

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={ handlePageClick }
                pageRangeDisplayed={3}
                pageCount={ totalPages }
                previousLabel="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    );
}

export default TableUsers;