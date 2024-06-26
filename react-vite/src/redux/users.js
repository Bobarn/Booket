const GET_USERS = "users/GET_USERS"


const getUsers = (users) => ({
	type: GET_USERS,
	users
})

export const thunkGetAllUsers = () => async(dispatch) => {
	const response = await fetch ('/api/users/')
	if(response.ok) {
		const {users} = await response.json()
		dispatch(getUsers(users))
		return users
	} else {
		const error = await response.json()
		return error
	}
}



export default function userReducer(state = {}, action) {
	switch (action.type) {

		case GET_USERS:{
			const newState = { ...state };
            const users = action.users;

            users.forEach((user) => {
                newState[user.id] = user
            })
            return newState
        }
		default:
			return state;
	}
}
