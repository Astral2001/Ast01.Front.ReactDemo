// Hooks
import { useEffect, useState } from "react";

// Services
import { fetchUsers } from "../../services/UserService";

// Components
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import UserModals from "./UserInfoModals"; // use for create new user

const TableUsers = ({ props }) => {
    const columns = [ "ID", "Email", "First name", "Last name", "Action" ];
    const [ users, setUsers ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ useCase, setUseCase ] = useState('');
    const [ dataEditUser, setDataEditUser ] = useState({}); // use for update user

    const [ isShowingModal, setIsShowingModal ] = useState(false);

    useEffect(() => {
        getPaginationData();
        getUsersByPage();
    }, []);

    // Methods
    // Add new user to top of table (just for fake api)
    const handleUpdateTable = (uC, user) => {
        uC === 'create' && setUsers([user, ...users]);
        uC === 'update' &&
            setUsers(users.map((item) => (
                item.id === user.id ? user : item
            )))
    }

    // Pagination
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
        }
    }

    const handlePageClick = ( event ) => {
        getUsersByPage(event.selected + 1);
    }

    return (
        <div className="table-users-container">
            <div className="table-users-header d-flex justify-content-between align-items-lg-center">
                <h1 className="table-users-title my-3 text-primary">
                    List users
                </h1>

                <button
                    className="btn btn-primary"
                    onClick={ () => {
                        setUseCase('create')
                        setIsShowingModal(true)
                    }}
                >
                    New user
                </button>
            </div>

            <Table striped hover responsive>
                <thead>
                    <tr>
                    {
                        Array.from({ length: columns.length }).map((_, index) => (
                            <th key={ index } className="text-primary">
                                { columns[index] }
                            </th>
                        ))
                    }
                    </tr>
                </thead>
                <tbody>
                {
                    users && users.length > 0 &&
                    users.map((user, index) => (
                        <tr key={`user-${index}`}>
                            <td> {user.id} </td>
                            <td> {user.email} </td>
                            <td> {user.first_name} </td>
                            <td> {user.last_name} </td>
                            <td className="">
                                <button
                                    className="btn btn-success me-3 w-25"
                                    onClick={ () => {
                                        setUseCase('update')
                                        setIsShowingModal(true)
                                        setDataEditUser(user)
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger w-25"
                                    onClick={ () => {

                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
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

            <UserModals
                useCase = { useCase }
                isShow = { isShowingModal }
                handleShow = { (showing = false) => {
                    setIsShowingModal(showing)
                    useCase === 'update' && setDataEditUser({})
                }}
                handleUpdateTable = { handleUpdateTable }
                dataEditUser = {
                    useCase === 'update' ? dataEditUser : {}
                }
            />
        </div>
    );
}

export default TableUsers;