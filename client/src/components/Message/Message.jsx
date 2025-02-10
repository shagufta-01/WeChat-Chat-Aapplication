import React from 'react'
import './Message.css'
function Message({user,message, classs}) {
  if(user){
    console.log(message)
    return (
    
    <div className={`messageBox ${classs}`}>
{`${user} : ${message}`} 

    </div>
  )
}
else{
  return (
    
    <div className={`messageBox ${classs}`}>
{`You: ${message}`} 

    </div>
  )
}}

export default Message
