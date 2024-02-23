import React from 'react'
import './errorPage.css'
import { Link } from 'react-router-dom'
import { IoChevronForwardOutline } from "react-icons/io5";

const ErrorPage = () => {
  return (
    <>
      <div className="error-page">
        <div className="oops">OOPS!</div>
        <p>Error 404 : Page Not Found</p>
        <button>
          <Link to="/" className='go-back-btn'>
            Go back 
            <IoChevronForwardOutline className='reload-icon' size={23} /> 
          </Link>
        </button>
      </div>
    </>
  )
}

export default ErrorPage