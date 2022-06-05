import { useState, useEffect } from 'react';

import { Avatar, IconButton } from '@mui/material'
import { Search, RateReviewOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import './Sidebar.css'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import  db, { auth } from './firebase'
import { onSnapshot, collection, addDoc } from "firebase/firestore";

const Sidebar = () => {

    const user = useSelector(selectUser)
    const [chats, setChats] = useState([])

    useEffect(() => {
        
        onSnapshot(collection(db, 'chats'), (snapshot) => {
            setChats(
                snapshot.docs.map((doc) => ({
                    id : doc.id,
                    data : doc.data()
                }))
            )
        })
    }, [])

    const addChat = async () => {

        const chatName = prompt('Enter a chat name');
        if (chatName) {
            const newChat = await addDoc(collection(db, 'chats'), {
                chatName : chatName,
            })
        }
    }

  return (
    <div className='sidebar'>
        <div className="sidebar-header">
            <Avatar 
                src={user.photoURL} 
                className="sidebar-avatar" 
                onClick={() => auth.signOut()}
            />
            <div className="sidebar_input">
                <Search />
                <input placeholder='Search'></input>
            </div>

            <IconButton variant="outlined" className='sidebar-inputButton' onClick={() => addChat()}>
                <RateReviewOutlined />
            </IconButton>
        </div>
        <div className="sidebar-chats">
            {chats.map(({id, data: { chatName } }) => (
                <SidebarChat key={id} id={id} chatName={chatName}/>
            ))}
        </div>
    </div>
  )
}

export default Sidebar