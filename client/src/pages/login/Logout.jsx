import { React, useContext, useEffect } from 'react'
import { UserContext } from '../../context/userContext' 
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const {setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate()

  setCurrentUser(null)
  useEffect(() => {
    navigate('/login')
  })
  return (
    <></>
  )
}

export default Logout