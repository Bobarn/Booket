import { useState, useEffect } from 'react';
import { thunkSendMsg, thunkGetMsgsByChat, editMsg, receiveMsg, removeMsg } from '../../redux/messages';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import './ChatRoom.css';
let typeTimeout;
let textArea;
let defaultHeight;

const Chat = () => {
    const dispatch = useDispatch();
    // const [chatInput, setChatInput] = useState("");
    // const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const { chatId } = useParams();
    const { setModalContent, closeModal} = useModal();
    const chat = useSelector(state => state.chat[chatId])
    const msgs = useSelector(state => state.messages)
    const [messageInput, setMessageInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [active, setActive] = useState(new Set());
    const chatBar = document.getElementById('chatBarContent');
    const [shifting, setShifting] = useState(false);

    useEffect(() => {
        window.addEventListener('keydown', ({key}) => { if (key === 'Shift') setShifting(true) })
        window.addEventListener('keyup', ({key}) => { if (key === 'Shift') setShifting(false) })
        window.addEventListener('resize', resizeTextArea)
      }, [])


    const emitTyping = typing => {
        setTyping(typing)
        window.socket.emit('typing', {
            name: user.username,
            chat_id: chatId,
            is_typing: typing
        })
    }


  const resizeTextArea = () => setTimeout(()=>{
    if(!textArea) textArea = document.getElementById('chatBarFooterTxt')
    textArea.rows = 1
    if(!defaultHeight) defaultHeight = textArea.scrollHeight
    textArea.rows = textArea.scrollHeight==defaultHeight? 1 : ~~(Math.min(textArea.scrollHeight, window.innerHeight*.5)*.05-1)
  },0)


  const submitMsg = () => {
    if(!messageInput.trim()) return
    if(messageInput.trim().length > 1000) return setModalContent(
      <div id="modalMessageTooLong">
        <div id="modalTitle">Your message is too long...</div>
        <div className='hCaption'>Please edit your message to be within the 1,000 character limit.</div><br/>
        <div id="modalFooter">
          <div className="btnText"/>
          <div className="btn btnBlue" onClick={closeModal}>Okay</div>
          <div id="modalFooterBg"/>
        </div>
      </div>
    )
    dispatch(thunkSendMsg(chatId, { content: messageInput.trim() }))
    setMessageInput('')
    resizeTextArea()
  }

    useEffect(() => {
        // open socket connection
        // create websocket
        window.socket = io();

        window.socket.on('sendMessage', msg => {
            if(msg.chat_id == chatId) dispatch(receiveMsg(msg))
          })
        window.socket.on('editMsg', msg => {
           if(msg.chat_id == chatId) dispatch(editMsg(msg))
        })
        window.socket.on('deleteMsg', msgId => {
          dispatch(removeMsg(msgId))
        })
        window.socket.on('typing', data => {
            if(data.is_typing && data.chat_id==chatId) setActive(set => new Set([...set, data.username]))
            else setActive(set => new Set([...set].filter(n => n!=data.username)))
        })
        // when component unmounts, disconnect
        return (() => {
            window.socket.disconnect()
        })
    }, [])


    useEffect(()=>{
        const isTyping = messageInput? true : false
        if(isTyping === typing) return
        emitTyping(isTyping)
      },[messageInput, chatId, user])

      useEffect(()=>{
        setActive(new Set())
        setMessageInput('')
        resizeTextArea()
      }, [chatId])

      useEffect(()=>{
        if(!messageInput) return
        clearTimeout(typeTimeout)
        typeTimeout = setTimeout(() => {
          emitTyping(false)
        }, 5000);
      },[messageInput])

      useEffect(()=>{
        dispatch(thunkGetMsgsByChat(chatId))
      },[chatId, dispatch])

      useEffect(()=>{
        if(chatBar) chatBar.scrollTop = chatBar.scrollHeight
      },[msgs,chatBar])

    // const updateChatInput = (e) => {
    //     setChatInput(e.target.value)
    // };

    // const sendChat = (e) => {
    //     e.preventDefault()
    //     socket.emit("sendMessage", { user: user.username, msg: messageInput });
    //     setMessageInput("")
    // }

    // return (user && (
    //     <div>
    //         <div>
    //             {messages.map((message, ind) => (
    //                 <div key={ind}>{`${message.user}: ${message.msg}`}</div>
    //             ))}
    //         </div>
    //         <form onSubmit={sendChat}>
    //             <input
    //                 value={chatInput}
    //                 onChange={updateChatInput}
    //             />
    //             <button type="submit">Send</button>
    //         </form>
    //     </div>
    // )
    // )
    return (
        <div id='chatBar'>
            {chat ? <>
                <div id='chatBarHeader'>
                    <div id='chatBarHeaderName'>New Chat</div>
                </div>
                <div id='chatBarContent'>
                    <div id='chatBarSpace'></div>
                    {
                    msgs && Object.values(msgs)
                        .filter(m => m.chat_id == chatId)
                        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                        // .map((m, i, a) =>
                        //     m.id && <Message
                        //         key={m.id}
                        //         msg={m}
                        //         server={server}
                        //         fullHeight={!a[i - 1] || (a[i - 1].author_id !== m.author_id)}
                        //     />
                        // )
                    }
                </div>
                <div id='chatBarFooter'>
                    <div id='chatBarFooterInput'>
                        <textarea
                        id='chatBarFooterText'
                        rows={1}
                        placeholder={`Message #${chat}`}
                        value={messageInput}
                        onChange={e => {
                            setMessageInput(e.target.value)
                            resizeTextArea()
                        }}
                        onKeyDown={e => {
                            if(e.shiftKey || e.key !== 'Enter' || shifting) return
                            e.preventDefault()
                            submitMsg()
                        }}
                        />
                        <div id='chatBarFooterLine'></div>
                        <div id='chatBarFooterSend'
                            onClick={submitMsg}
                        >
                            <img className={messageInput.trim().length ? '' : 'buttonDisabled'} src='/icons/send.svg'/>
                        </div>
                        <div id='chatBarFooterTyping'> {
                            active.size ? [...active].join(', ') + ' is typing...' : ''
                        }</div>
                        {(2000 - messageInput.trim().length) <= 200 && <div style={{color:2000-messageInput.trim().length < 0? '#f85b60' : '#bcbec2'}} id='chatBarCharLimit'>{2000 - messageInput.trim().length}</div>}
                    </div>
                </div>
            </> :
            <h1>No chat found~!</h1>}
        </div>
    )
};


export default Chat;
