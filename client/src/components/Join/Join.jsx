import React, { useState } from 'react'
import './Join.css'
import logo from '../../images/logo.png'
import {Link} from 'react-router-dom'

let user;
const sendUser=()=>{
  console.log("send user from join components",user)
  user= document.getElementById('joininput').value;
  
  document.getElementById(joininput).value = "";
}
function Join() {
const [name, setName] = useState("")

  return (
    <div className='joinPage'>
      <div className="joinContainer">
<img src={logo} alt="" />
<h1>C Chat</h1>
<input onChange={(e)=>setName(e.target.value)} type="text" id="joininput" placeholder='enter your name' />
  <Link onClick={(e)=> !name ?e.preventDefault():null} to="/chat"> <button onClick= {sendUser} className='joinbtn'>Login </button></Link>
      </div>
   
    </div>
  )
}

export default Join
export {user}