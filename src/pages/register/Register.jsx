import React, { useState } from "react"
import "./Register.scss"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import upload from "../../utils/upload"
import newRequest from "../../utils/newRequest"

function Register() {
  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  // const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
const [user, setUser] = useState({
  username:"",
  email:"",
  image:"",
  password:"",
  country:"",
  phone:"",
  description:"",
  isSeller:false,
})


  const navigate = useNavigate()

  // const upload = async (file) => {
  //   const data = new FormData();
  //   data.append("file", file)
  //   data.append("upload_preset", "fiverr");
  //   try{
  //       const res = await axios.post("https://api.cloudinary.com/v1_1/dnwwzu0by/image/upload",data)
  //   } catch(err){
  //     console.log(err)
  //   }

  // }

const handleChange = (e) => {
  e.preventDefault()
  setUser((prev) =>{
    return {...prev, [e.target.name]: e.target.value}
  })
 
}


const handleSeller = (e) => {
  e.preventDefault()
  setUser((prev) =>{
    return {...prev, isSeller: e.target.checked}
  })
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const url = await upload(file)
  try{
    await newRequest.post("auth/register",{
      ...user, image:url
    })
    navigate('/')
  } catch(err){
    console.log(err)
  }
}

console.log(user)

  return (
    <div className="register">
    <form onSubmit={handleSubmit}>
      <div className="left">
        <h1>Create a new account</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={handleChange}
        />
        <label htmlFor="">Email</label>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
        <label htmlFor="">Password</label>
        <input name="password" type="password" onChange={handleChange} />
        <label htmlFor="">Profile Picture</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <label htmlFor="">Country</label>
        <input
          name="country"
          type="text"
          placeholder="Usa"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </div>
      <div className="right">
        <h1>I want to become a seller</h1>
        <div className="toggle">
          <label htmlFor="">Activate the seller account</label>
          <label className="switch">
            <input type="checkbox" onChange={handleSeller} />
            <span className="slider round"></span>
          </label>
        </div>
        <label htmlFor="">Phone Number</label>
        <input
          name="phone"
          type="text"
          placeholder="+1 234 567 89"
          onChange={handleChange}
        />
        <label htmlFor="">Description</label>
        <textarea
          placeholder="A short description of yourself"
          name="description"
          id=""
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>
      </div>
    </form>
  </div>
  )
}

export default Register