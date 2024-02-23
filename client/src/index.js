import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from "./components/layout/Layout"
import ErrorPage from "./pages/error/ErrorPage"
import { Home } from "./pages/home/Home"
import { DetailsPages } from "./pages/details/DetailsPages"
import { Login } from "./pages/login/Login"
import Register from "./pages/login/Register"
import Dashboard from "./pages/account/Dashboard"
import { Account } from "./pages/account/Account"
import Create from "./components/create/Create"
import Edit from "./components/create/Edit"
import UserProvider from "./context/userContext"
import Logout from "./pages/login/Logout"
import CategoryPosts from "./pages/categories/CategoryPosts"
import { UpdateName } from "./pages/account/UpdateName"
import { UpdatePassword } from "./pages/account/UpdatePassword"
import ResetPassword from "./pages/login/ResetPassword"
 
const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/>},
      {path: 'posts/:id', element: <DetailsPages/>},
      {path: 'categories/:category', element: <CategoryPosts/>},
      {path: 'login', element: <Login/>},
      {path: 'register', element: <Register/>},
      {path: 'profile/:id', element: <Account/>},
      {path: 'myposts/:id', element: <Dashboard/>},
      {path: 'create', element: <Create/>},
      {path: 'logout', element: <Logout/>},
      {path: 'editName', element: <UpdateName/>},
      {path: 'editPassword', element: <UpdatePassword/>},
      {path: 'edit/:id', element: <Edit/>},
      {path: 'reset-password', element: <ResetPassword/>},
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>
)
