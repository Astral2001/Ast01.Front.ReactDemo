import { toUserAPI } from "../utils/toAPIs";

const fetchUsers = (page_num = 1) => {
    return toUserAPI.get(`/users?page=${page_num}`);
}

const postCreatedUser = (newUser) => {
    return toUserAPI.post(`/users`, { name: newUser.name, job: newUser.job });
}

const updateUser = (id, updatedUser) => {
    return toUserAPI.put(`/users/${id}`,
    {
        name: updatedUser.name,
        job: updatedUser.job
    });
}

const deleteUser = (id) => {
    return toUserAPI.delete(`/users/${id}`);
}

export { fetchUsers, postCreatedUser, updateUser, deleteUser };

