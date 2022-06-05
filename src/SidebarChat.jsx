import './SidebarChat.css'
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setChat } from './features/chatSlice';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"; 
import  db from './firebase'
import TimeAgo from 'react-timeago'

const SidebarChat = ({ id, chatName }) => {

  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([])

  useEffect(() => {
    const messagesColRef = collection(db, 'chats', id, 'messages')
    const messagesQuery = query(messagesColRef, orderBy('timestamp', 'desc'))
    onSnapshot(messagesQuery, (snapshot) => {
      setChatInfo(
            snapshot.docs.map((doc) => ({
                data : doc.data()
            }))
        )
    })
  }, [id])

  return (
    <div 
      onClick={() => 
        dispatch(
            setChat({
              chatId: id,
              chatName: chatName
            })
          )
        } 
      className='sidebarchat'>
        <Avatar />
        <div className="sidebarchat_info">
            <h3>{chatName}</h3>
            <p> {chatInfo[0]?.data.message}</p>
            <small>
              <TimeAgo date={chatInfo[0]?.data.timestamp?.toDate()} />
            </small>
        </div>
    </div>
  )
}

export default SidebarChat