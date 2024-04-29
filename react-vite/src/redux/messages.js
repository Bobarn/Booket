import { csrfFetch } from "./csrf";
export const [LOAD_MSGS,LOAD_MY_MSGS,RECEIVE_MSG,REMOVE_MSG,UPDATE_MSG] = ['msgs/LOAD_MSGS','msgs/LOAD_MY_MSGS','msgs/RECEIVE_MSG','msgs/REMOVE_MSG','msgs/UPDATE_MSG'];

const loadMsgs = msgs => ({
	type: LOAD_MSGS,
	msgs
});
export const receiveMsg = msg => ({
	type: RECEIVE_MSG,
	msg
})
export const removeMsg = msgId => ({
	type: REMOVE_MSG,
	msgId
})
export const editMsg = msg => ({
	type: UPDATE_MSG,
	msg
});


export const thunkGetMsgsByChat = chatId => dispatch => {
	csrfFetch(`/api/chats/${chatId}/messages`)
	.then(r=>r.json())
	.then(d => {
		// console.log(d.messages);
		dispatch(loadMsgs(d.messages))
	})
	.catch(e => {
		console.error(e)
		dispatch(loadMsgs([]))
	})
};
export const thunkGetOneMsg = msgId => dispatch => {
	csrfFetch(`/api/messages/${msgId}`)
	.then(r=>r.json())
	.then(d => dispatch(receiveMsg(d)))
	.catch(e => {
		console.error(e)
	})
};
export const thunkSendMsg = (chatId, body) => dispatch => {
	csrfFetch(`/api/chats/${chatId}/message`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})
	.then(r=>r.json())
	.then(d => {
		dispatch(receiveMsg(d))
		window.socket.emit('sendMessage', d)
	})
	.catch(console.error)
}
export const thunkDeleteMsg = msgId => dispatch => {
	csrfFetch(`/api/messages/${msgId}`, { method: 'DELETE' })
	.then(() => {
		dispatch(removeMsg(msgId))
		window.socket.emit('deleteMessage', msgId)
	})
	.catch(console.error)
}
export const thunkEditMsg = (msgId, content) => dispatch => {
	csrfFetch(`/api/messages/${msgId}`, {
		method: 'PUT',
		body: JSON.stringify({content})
	})
	.then(r=>r.json())
	.then(d => {
		dispatch(editMsg(d))
		window.socket.emit('editMessage', d)
	})
	.catch(console.error)
}


const messagesReducer = (state = { }, action) => {
	switch (action.type) {
		case LOAD_MSGS: {
			const msgsState = {};
			action.msgs.forEach(msg => {
				msgsState[msg.id] = msg;
			});
			return msgsState;
		}
		case RECEIVE_MSG:
			return { ...state, [action.msg.id]: action.msg };
		case UPDATE_MSG:
			return { ...state, [action.msg.id]: action.msg };
		case REMOVE_MSG: {
			const newState = { ...state };
			delete newState[action.msgId];
			return newState;
		}
		default:
			return state;
	}
};
export default messagesReducer;
