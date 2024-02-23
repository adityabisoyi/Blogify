import React from "react"
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai"
import { TiHeart } from "react-icons/ti";
import { RiInstagramFill } from "react-icons/ri"
import './footer.css'

export const Footer = () => {
  return (
    <>
      <footer className='boxItems'>
        <div className='container flex'>
          <p className="footer-text">
          Made with 
          <TiHeart className="heart-icon" color="red" size={20}/>
          by
          <a href="https://github.com/adityabisoyi" className="red">Aditya Bisoyi</a> 
          </p>
          <div className='social'>
            <RiInstagramFill className='icon' />
            <AiFillTwitterCircle className='icon' />
            <AiFillLinkedin className='icon' />
          </div>
        </div>
      </footer>
    </>
  )
}
