import { React, useContext, useEffect, useState } from "react"
import "./create.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from 'axios'

const Create = () => {
  const [category, setCategory] = useState('Uncategorized')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState()
  const [error, setError] = useState('')
  const [disableBtn, setDisableBtn] = useState(false)

  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  })

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

  const createPost = async (e) => {
    e.preventDefault()
    // const postData = new FormData()
    // postData.set('title', title)
    // postData.set('category', category)
    // postData.set('description', description)
    // postData.set('thumbnail', thumbnail)

    const postData = new FormData()
    postData.append('title', title)
    postData.append('category', category)
    postData.append('description', description)
    postData.append('thumbnail', thumbnail)
    
    try {
      // console.log(postData.title)
      // console.log(postData.description)
      // console.log(postData.category)
      // console.log(postData.thumbnail)
      setDisableBtn(true)
      const response =  await axios.post(`${process.env.REACT_APP_BASE_URL}/post`, postData, {
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

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <h1>Create Post</h1>
          <form encType="multipart/form-data" onSubmit={createPost}>
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

            <input type="file" filename={thumbnail} onChange={(e) => setThumbnail(e.target.files[0])} className="thumbnail-input" accept="png, jpg, jpeg, svg, webp"/>

            <button className='button' type="submit" disabled={disableBtn}>Create Post</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Create;