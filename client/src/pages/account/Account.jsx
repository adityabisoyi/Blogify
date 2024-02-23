import { React, useState, useContext, useEffect} from "react"
// import image from "../../assets/images/input.png"
import "./account.css"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import axios from 'axios'
import Loader from "../../components/loader/Loader"

export const Account = () => {
  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
    
    const setData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${currentUser.id}`,)
        setUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    setData()
    // console.log(user)
  }, [])

  if(isLoading) {
    return <Loader/>
  }

  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Account Information</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                {/* <input type='file' accept='image/*' src={image} alt='img' /> */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Eo_circle_red_letter-b.svg/2048px-Eo_circle_red_letter-b.svg.png" alt='' className='image-preview' />
              </div>
            </div>
            <div className='right'>
              <div className="data-fields">
                <label>Name</label>
                <p className="data-box">{user.name}</p>
                <label>Email</label>
                <p className="data-box">{user.email}</p>
              </div>
              <div className="form-btn">
                <button className='button'>
                  <Link to='/editName'>
                    Change name
                  </Link>
                </button>
                <button className='button'>
                  <Link to='/editPassword'>
                    Change password
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
