import { React, useState, useContext } from "react"
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from "../../context/userContext"

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const {setCurrentUser} = useContext(UserContext)

  const changeInputHandler = (e) => {
    setLoginData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, loginData)
      const user = await response.data
      setCurrentUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <>
      <section className='login login-page'>
        <div className='container'>

          <form className="login-form" onSubmit={loginUser}>
            {error && <p className="error-msg">{error}</p>}
            <label>Username or email address <span className="red">*</span></label>
            <input type='email'  name="email" value={loginData.email} onChange={changeInputHandler} required />

            <label>Password <span className="red">*</span></label>
            <input type='password' name="password" value={loginData.password} onChange={changeInputHandler} required />

            <div className="already-holder forgot-pass" style={{"marginTop": "0.6em"}}>
              <Link to='/reset-password'>
                Forgot password
              </Link>
            </div>
            <button className='button'>Log in</button>
          </form>
          <div className="already-holder">
            New user?
            <Link to='/register' className="red">Sign Up</Link>
          </div>
        </div>
      </section>
    </>
  )
}
