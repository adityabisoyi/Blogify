import { React, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import Item from '../../components/blog/Item';

const Dashboard = () => {
  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  })

  const { id } = useParams()
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/users/${id}`)
        setBlogs(response?.data.authorPosts)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    
    fetchPosts()
  
  }, [id])


  if(isLoading) {
    return <Loader/>
  }

  return (
    <>
      <section>
        <div className="item-list">
          {blogs.map((item) => {
            return <Item key={item._id} title = {item.title} thumbnail={item.thumbnail} id={item._id} />
          })}
        </div>
      </section>
    </>
  )
}

export default Dashboard