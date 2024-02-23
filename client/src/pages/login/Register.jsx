import { React, useState } from "react"
import "./login.css"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
// require('dotenv').config

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }
  
  const registerUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, userData)
      const newUser = await response.data;
      // console.log(newUser)
      if(!newUser) {
        setError('Cannot Register, try again!')
      }
      navigate('/login')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <>
      <section className='login'>
        <div className='container'>

          <form className="register-form" onSubmit={registerUser}>
            {error && <p className="error-msg">{error}</p>}
            <label>Email address <span className="red">*</span></label>
            <input type='email' name="email" value={userData.email} onChange={changeInputHandler} required />

            <label>Full name <span className="red">*</span></label>
            <input type='text' name="name" value={userData.name} onChange={changeInputHandler} required />

            <label>Password <span className="red">*</span></label>
            <input type='password' name="password" value={userData.password} onChange={changeInputHandler} required />

            <label>Confirm Password <span className="red">*</span></label>
            <input type='password' name="password2" value={userData.password2} onChange={changeInputHandler} required />

            <button type="submit" className='button' >Register</button>
          </form>
          <div className="already-holder">
            Already have an account?
            <Link to='/login' className="red">Log In</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register