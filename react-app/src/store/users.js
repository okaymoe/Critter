const GET_USERS = "/users/GET_USERS";
const CREATE_USER = '/users/CREATE_USER';

const allUsers = (users) => ({
    type: GET_USERS,
    users,
});

const createUser = (user) => ({
    type: CREATE_USER,
    user
})

export const getUsers = () => async (dispatch) => {
    const response = await fetch("/api/users");
    if (response.ok) {
        const userList = await response.json();
        dispatch(allUsers(userList));
        return userList;
    }
};

export const newUser = (user) => async (dispatch) => {
    const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        const user = await response.json();
        dispatch(createUser(user));

        return user;

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const editingUsers = (editUser) => async (dispatch) => {

    const {
        username,
        name,
        bio,
        profile_img,
        header_img,
        email,
        password,
        birthday,
        location,
        joined
    } = editUser;

    const formData = new FormData();

    formData.append("username", username);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("profile_img", profile_img);
    formData.append("header_img", header_img);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birthday", birthday);
    formData.append("location", location);
    formData.append("joined", joined);

    const response = await fetch(`/api/users/edit/${editUser.id}`, {
        method: "PUT",
        body: formData
    });
    if (response.ok) {
        const editedUser = await response.json();
        dispatch(createUser(editedUser));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USERS:
            const allUsers = {};
            action.users.users.forEach(user => {
                allUsers[user.id] = user;
            })
            return allUsers;
        case CREATE_USER:
            return { ...state, [action.user.id]: action.user };
        default:
            return state;
    }
};

export default usersReducer;
