import { React, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/userContext'


const Item = ({id, title, thumbnail}) => {
  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  
  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  })


  const deletePost = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/post/${id}`, {
          withCredentials: true,
          headers: {Authorization: `Bearer ${token}`}
        })
      console.log(response.data)
      if(response.status === 200) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="item-box">
        <div className="item-thumbnail">
          <img src={thumbnail} alt="thumbnail" />
        </div>
        <div className="item-details">
          <div className="item-title">
            <p>{title}</p>
          </div>
          <div className="item-btns">
            <button className='edit-btn'>
              <Link to={`/edit/${id}`}>
                Edit
              </Link>
            </button>
            <button className='delete-btn' onClick={deletePost}>
                Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item