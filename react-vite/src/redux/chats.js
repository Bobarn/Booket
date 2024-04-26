import { csrfFetch } from "./csrf";
export const [LOAD_CHATS, REMOVE_CHAT] = ['chats/LOAD_CHAT','chat/REMOVE_CHAT'];

const loadChats = chats => ({
	type: LOAD_CHATS,
	chats
});

export const removeChat = chatId => ({
	type: REMOVE_CHAT,
	chatId
})


export const thunkGetChats = () => dispatch => {
	csrfFetch(`/api/chats/all`)
	.then(r=>r.json())
	.then(d => dispatch(loadChats(d)))
	.catch(e => {
		console.error(e)
		dispatch(loadChats([]))
	})
};

export const thunkRemoveChat = chatId => dispatch => {
	csrfFetch(`/api/chats/${chatId}`, { method: 'DELETE' })
	.then(() => {
		dispatch(removeChat(chatId))
	})
	.catch(console.error)
}


const chatsReducer = (state = { chat: {} }, action) => {
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
		default:
			return state;
	}
};
export default chatsReducer;
