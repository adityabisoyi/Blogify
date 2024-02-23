import React, { useState, useContext } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BiLogOut } from "react-icons/bi"
import { RiImageAddLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/userContext";

export const User = () => {
  const user = true
  const [profileOpen, setProfileOpen] = useState(false)
  const close = () => {
    setProfileOpen(false)
  }

  const {currentUser} = useContext(UserContext)
  return (
    <>
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Eo_circle_red_letter-b.svg/2048px-Eo_circle_red_letter-b.svg.png' alt='' />
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                {/* <Link to='/account'> */}
                  <div className='image'>
                    <div className='img'>
                      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Eo_circle_red_letter-b.svg/2048px-Eo_circle_red_letter-b.svg.png' alt='' />
                    </div>
                    <div className='text'>
                      <h4>{currentUser.name}</h4>
                      {/* <label>Los Angeles, CA</label> */}
                    </div>
                  </div>
                {/* </Link> */}
                <Link to='/create'>
                  <button className='box'>
                    <RiImageAddLine className='icon' />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to={`/profile/${currentUser.id}`}>
                  <button className='box'>
                    <IoSettingsOutline className='icon' />
                    <h4>My Account</h4>
                  </button>
                </Link>
                <Link to={`/myposts/${currentUser.id}`}>
                  <button className='box'>
                    <MdOutlineDashboardCustomize className='icon' />
                    <h4>Dashboard</h4>
                  </button>
                </Link>
                <Link to='/logout'>
                  <button className='box'>
                    <BiLogOut className='icon' />
                    <h4>Log Out</h4>
                  </button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <button>My Account</button>
        )}
      </div>
    </>
  )
}
