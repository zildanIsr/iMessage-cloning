import './Message.css'
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { forwardRef } from 'react';

const Message = forwardRef( 
  (
    {
      id, 
      contents : {timestamp, displayName, photoURL, message, uid, email}
    }, ref
  ) => {

  const user = useSelector(selectUser)

  return (
    <div ref={ref} className={`message ${user.email === email && "message_sender"}`}>
        <Avatar className='message_photo' src={photoURL}/>
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    </div>
  )
})


export default Message