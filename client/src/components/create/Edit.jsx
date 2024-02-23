import { React, useContext, useEffect, useState } from "react"
import "./create.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from 'axios'
import Loader from "../loader/Loader";

const Create = () => {
  const [category, setCategory] = useState('Uncategorized')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // const [thumbnail, setThumbnail] = useState()
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const { id } = useParams()
//   const [blog, setBlog] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }

    const getPost = async () => {
        try {
          setIsLoading(true)
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/${id}`)
          setTitle(response.data.title)
          setDescription(response.data.description)
          setCategory(response.data.category)
          // setThumbnail(response.data.thumbnail)
          setIsLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
      
      getPost()
  }, [])

  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ]

  const POST_CATEGORIES = [
    "Agriculture", 
    "Arts and Culture", 
    "Business and Entrepreneurship", 
    "Education", 
    "Environment and Sustainability",
    "Music and Entertainment", 
    "Fashion", 
    "Food and Cooking",
    "Fun", 
    "Personal finance", 
    "Health and Fitness",
    "Life", 
    "Miscellaneous", 
    "Sports", 
    "Science",
    "Travel", 
    "Technology",
    "Uncategorized",
    "Weather", 
  ]

  const editPost = async (e) => {
    e.preventDefault()

    // const editData = new FormData()
    // editData.append('title', title)
    // editData.append('category', category)
    // editData.append('description', description)


    const editData = {
      'title': title,
      'category': category,
      'description': description
    }
    // console.log(editData.title, editData.category, editData.description)
    try {
      const response =  await axios.patch(`${process.env.REACT_APP_BASE_URL}/post/${id}`, editData, {
        withCredentials: true,
        headers: {Authorization: `Bearer ${token}`}
      })
      // console.log(response.data)
      setError('')
      if(response.status === 200) {
        navigate('/')
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  if(isLoading) {
    return <Loader/>
  }

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <h1>Edit Post</h1>
          <form encType="multipart/form-data" onSubmit={editPost}>
            {error && <p className="error-msg">{error}</p>}
            <input type='text' value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder='Title' autoFocus/>
            <select name="category" value={category} onChange={(e) => {setCategory(e.target.value)}}>
              {POST_CATEGORIES.map((item) => 
                <option key={item}>{item}</option>
              )}
            </select>
            <div className="text-area">
              <ReactQuill modules={modules} formats={formats} theme="snow" value={description} onChange={setDescription} />
            </div>

            {/* <input type="file" filename={thumbnail} onChange={(e) => setThumbnail(e.target.files[0])} className="thumbnail-input" accept="png, jpg, jpeg"/> */}

            <button className='button' type="submit">Edit Post</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Create;