import { MicNone } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectChatName, selectChatId } from './features/chatSlice';
import { selectUser } from './features/userSlice';
import { collection, query, orderBy, onSnapshot, serverTimestamp, setDoc, doc } from "firebase/firestore"; 
import  db from './firebase'
import Message from './Message';
import FlipMove from 'react-flip-move';
import './Chat.css'

const Chat = () => {

    const user = useSelector(selectUser)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId)

    useEffect(() => {
        if (chatId) {

            const messagesColRef = collection(db, 'chats', chatId, 'messages')
            const messagesQuery = query(messagesColRef, orderBy('timestamp', 'desc'))
            onSnapshot(messagesQuery, (snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id : doc.id,
                        data : doc.data()
                    }))
                )
            })
        }

    }, [chatId])

    const sendMessage = async (e) => {
        e.preventDefault();
        
        const messagesColRef = collection(db, 'chats', chatId, 'messages')
        const newMessage = doc(messagesColRef)
        await setDoc(newMessage, {
            timestamp: serverTimestamp(),
            message: input,
            uid : user.uid,
            displayName : user.displayName,
            photoURL : user.photoURL,
            email : user.email
        })

        setInput('');
    }

  return (
    <div className='chat'>
        <div className="chat-header">
            <h4>
                To: <span className='chat-name'>{chatName}</span>
            </h4>
            <strong>Details</strong>
        </div>

        <div className="chat-body"> 
            <FlipMove>
                {messages.map(({id, data}) => (
                    <Message key={id} id={id} contents={data} />
                ))}
            </FlipMove>
        </div>

        <div className="chat-input">
            <form>
                <input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                />
                <button onClick={sendMessage}>Send</button>
            </form>
            <IconButton>
                <MicNone className='chat-mic' />
            </IconButton>
        </div>
    </div>
  )
}

export default Chat