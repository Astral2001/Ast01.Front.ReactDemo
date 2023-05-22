import toAPI from "../utils/request";

const fetchUsers = (page_num = 1) => {
    return toAPI.get(`/users?page=${page_num}`);
}

export { fetchUsers };
