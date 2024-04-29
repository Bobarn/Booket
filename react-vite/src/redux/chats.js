import { csrfFetch } from "./csrf";
export const [LOAD_CHATS, REMOVE_CHAT, CREATE_CHAT] = ['chats/LOAD_CHAT','chat/REMOVE_CHAT', 'chats/CREATE_CHAT'];

export const loadChats = chats => ({
	type: LOAD_CHATS,
	chats
});

export const removeChat = chatId => ({
	type: REMOVE_CHAT,
	chatId
})

export const createChat = (chat) => (
	{
		type: CREATE_CHAT,
		chat
	}
)

export const thunkGetChats = () => async dispatch => {
	csrfFetch(`/api/chats/all`)
	.then(r=>r.json())
	.then(d => dispatch(loadChats(d)))
	.catch(e => {
		console.error(e)
		dispatch(loadChats([]))
	})
};

export const thunkRemoveChat = chatId => async dispatch => {
	csrfFetch(`/api/chats/${chatId}`, { method: 'DELETE' })
	.then(() => {
		dispatch(removeChat(chatId))
	})
	.catch(console.error)
}

export const thunkCreateChat = (chat) => async dispatch => {
	try {
		// console.log("WE ARE INSIDE")
		const data = await csrfFetch(`/api/chats/new`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(chat)
		})
		let response = await data.json()
		// console.log(response, "HERE, I AM INSIDE");
		await dispatch(createChat(response));
		return response;

	}
	catch(err) {
		console.error(err);
	}
}


const chatsReducer = (state = { }, action) => {
	switch (action.type) {
		case LOAD_CHATS: {
			const newState = {};
			action.chats.forEach(chat => {
				newState[chat.id] = chat;
			});
			return newState;
		}
		case REMOVE_CHAT: {
			const newState = { ...state };
			delete newState[action.chatId];
			return newState;
		}
		case CREATE_CHAT: {
			const newState = {...state};
			newState[action.chat.id] = action.chat;
			return newState;
		}
		default:
			return state;
	}
};
export default chatsReducer;
