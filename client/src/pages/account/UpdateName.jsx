import { React, useState, useContext, useEffect} from "react"
import "./account.css"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import axios from 'axios'

export const UpdateName = () => {
  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const [error, setError] = useState('')

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  })

  const [name, setName] = useState({
    name: '',
    currentPassword: ''
  })

  const updateName = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/editName`, name, {
        withCredentials: true,
        headers: {Authorization: `Bearer ${token}`}
      })
      if(response.status === 200) {
        navigate('/')
      }
    } catch (err) {
      // console.log(err)
      setError(err.response.data.message) 
    }
  }

  const changeInputHandler = (e) => {
    setName(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  return (
    <>
      <section className='accountInfo' style={{"margin": "9.5em 1em"}}>
        <div className='container boxItems'>
          <h1>Update Name</h1>
          <div className='content'>
              {error && <p className="error-msg" style={{"margin-bottom": "1em"}}>{error}</p>}
            <div className='right' style={{"margin-top": "1em"}}>
              <form onSubmit={updateName}>
                <div className="data-fields">
                  <label htmlFor=''>Name</label>
                  <input className="data-box" type="text" name="name" value={name.name} onChange={changeInputHandler}/>
                  <label htmlFor=''>Password</label>
                  <input className="data-box" type="password"  name="currentPassword" value={name.currentPassword} onChange={changeInputHandler}/>
                </div>
                <div className="form-btn">
                  <button className='button' type="submit">Change name</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
