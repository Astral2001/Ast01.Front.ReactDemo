import { toUserAPI } from "../utils/toAPIs";

const fetchUsers = (page_num = 1) => {
    return toUserAPI.get(`/users?page=${page_num}`);
}

const postCreatedUser = (newUser) => {
    return toUserAPI.post(`/users`, { name: newUser.name, job: newUser.job });
}

export { fetchUsers, postCreatedUser };

