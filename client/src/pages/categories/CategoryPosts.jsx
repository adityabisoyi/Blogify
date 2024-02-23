import { React, useState, useEffect } from 'react'
import { Card } from '../../components/blog/Card'
import axios from 'axios'
import Loader from '../../components/loader/Loader'
import { useParams } from 'react-router-dom'

const CategoryPosts = () => {
  const { category } = useParams()
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/categories/${category}`)
        setBlogs(response?.data.categoryPosts)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    
    fetchPosts()
  
  }, [])

  if(isLoading) {
    return <Loader/>
  }

  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {
            blogs.map(({_id, thumbnail, title, description, author, category, createdAt}) => <Card key={_id} blogId={_id} title={title} description={description} author={author} category={category} thumbnail={thumbnail} date={createdAt}></Card>)
          }
        </div>
      </section>
    </>
  )
}

export default CategoryPosts