import FullPageLoader from '../components/FullPageLoader.jsx';
import { useState } from 'react';
import { auth } from "../firebase/config.js"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('')

  const handleCredentials = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage)
        console.log(errorMessage);
        console.log(errorCode);
        // ..
      });

  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        console.log(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }


  const handlePasswordReset = () => {
    const email = prompt("Enter your email");
    sendPasswordResetEmail(auth, email)
    alert("Email sent! Check your inbox for password reset instrutions.")
  }

  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}
      <div className="container login-page">
        <section>
          <h1>Welcome to the Book App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType === 'login' ? 'selected' : ''}`}
              onClick={() => setLoginType('login')}>
              Login
            </button>
            <button
              className={`btn ${loginType === 'signup' ? 'selected' : ''}`}
              onClick={() => setLoginType('signup')}>
              Signup
            </button>
          </div>
          <form className="add-form login">
            <div className="form-control">
              <label>Email *</label>
              <input type="text" name="email" placeholder="Enter your email" onChange={(e) => handleCredentials(e)} />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input type="password" name="password" placeholder="Enter your password" onChange={(e) => handleCredentials(e)} />
            </div>
            {
              loginType === 'login' ?
                <button onClick={(e) => handleLogin(e)} className="active btn btn-block">Login</button>
                :
                <button onClick={(e) => handleSignUp(e)} className="active btn btn-block" >Sign Up</button>

            }

            {error &&
              <div className="error">
                {error}

              </div>
            }



            <p onClick={handlePasswordReset} className="forgot-password">Forgot Password?</p>
          </form>
        </section>
      </div>
    </>
  )
}

export default LoginPage;
