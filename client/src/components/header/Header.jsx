import React, { useContext } from "react"
import "./header.css"
import { User } from "./User"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/userContext"

export const Header = () => {
   window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  })

  const {currentUser} = useContext(UserContext)
  return (
    <>
      <header className='header'>
        <div className='scontainer flex'>
          <Link to="/">
            <div className='logo'>
              <h1><span className="red">BLOG</span>IFY</h1>
            </div>
          </Link>
          {/* <nav>
            <ul>
              {nav.map((link) => (
                <li key={link.id}>
                  <Link to={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </nav> */}
          <div className='account flexCenter'>
            {currentUser == null ?  <div>
                                      <Link to='/login' className="login-btn">
                                        <button>
                                          Log In
                                          <div className="arrow-wrapper">
                                            <div className="arrow"></div>
                                          </div>
                                        </button>
                                      </Link>
                                    </div> : <User/>}
          </div>
        </div>
      </header>
    </>
  )
}
