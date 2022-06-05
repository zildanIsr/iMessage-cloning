import './Login.css'
import { loginBg } from './assets'
import { Button } from '@mui/material'
import { auth, provider } from './firebase'
import { signInWithPopup } from "firebase/auth";

const Login = () => {

  const loginIn = () => {
    signInWithPopup(auth, provider)
  }
    

  return (
    <div className='login'>
        <div className="login-logo">
            <img src={loginBg} alt="loginbg.png" />
            <h1>iMessage</h1>
        </div>

        <Button onClick={loginIn}>Sign in</Button>
    </div>
  )
}

export default Login