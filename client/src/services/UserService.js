import request from "../utils/request"

const fetchUsers = (page_num = 1) => {
    return request.get(`/users?page=${page_num}`);
}

export { fetchUsers }