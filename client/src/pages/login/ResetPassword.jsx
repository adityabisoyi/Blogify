import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [error, setError] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [passData, setPassData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  })

  const navigate = useNavigate()


  const changeInputHandler = (e) => {
    setPassData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const getOTP = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/send-otp`, {'email': userEmail})
      if(response.status === 200) {
        console.log(response.data) 
        setOtpSent(true)
        setPassData(prevState => ({
          ...prevState,
          ['email']: userEmail
        }));
        setError('')
      }      
    } catch (err) {
      setError(err.response.data.message)
    }

  }

  const changePassword = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/reset-password`, passData)
      // console.log(response.data)
      if(response.status === 200) {
        navigate('/login')
      }
    } catch (err) {
      setError(err.resposne.data.msg)
    }
  }
  return (
    <>
      <section className='login login-page'>
        <div className='container'>
            {otpSent ? 
              <>
                <form className="login-form" onSubmit={changePassword}>
                  {error && <p className="error-msg">{error}</p>}
                  <label>Password <span className="red">*</span></label>
                  <input type="password" name='password' value={passData.password} onChange={changeInputHandler} />

                  <label>Confirm Password <span className="red">*</span></label>
                  <input type="password" name='confirmPassword' value={passData.confirmPassword} onChange={changeInputHandler} />

                  <label>OTP <span className="red">*</span></label>
                  <input type="text" name='otp' value={passData.otp} onChange={changeInputHandler} />

                  <button className='button'>Change password</button>
                </form>
              </> : 
              <>
                <form className="login-form" onSubmit={getOTP}>
                  {error && <p className="error-msg">{error}</p>}
                  <label>Username or email address <span className="red">*</span></label>
                  <input type="email" value={userEmail} name='email' onChange={(e) => {setUserEmail(e.target.value)}}/>

                  <button className='button'>Send OTP</button>
                </form>
              </>
            }
        </div>
      </section>
    </>
  )
}

export default ResetPassword