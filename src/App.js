import React, {useEffect} from 'react';
import './App.css';
import Imessage from './Imessage';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './features/userSlice';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';

function App() {
  
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL
        }))
      } else {
        console.log('not logged in')
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="App">
      { user ? <Imessage /> : <Login />}

    </div>
  );
}

export default App;
