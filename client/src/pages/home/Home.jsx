import React from "react"
import { Category } from "../../components/category/Category"
import Blogs from "../../components/blog/Blogs"

export const Home = () => {
  return (
    <>
      {/*  <Slider />*/}
      <Category />
      <Blogs />
    </>
  )
}
