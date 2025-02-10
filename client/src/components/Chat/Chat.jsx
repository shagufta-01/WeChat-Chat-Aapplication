import React, { useEffect, useState } from 'react'
import { user} from '../Join/Join'
import './Chat.css'
import sendLogo from '../../images/send.png'
import socketIO from "socket.io-client"
import closeIcon from "../../images/closeIcon.png"
import ReactScrollToBottom from "react-scroll-to-bottom"
import Message from '../../components/Message/Message'
// import { use } from 'react'
const ENDPOINT ='http://localhost:9000/'
let socket;
function Chat() {
const [id, setId] = useState("")
const [messages , setMessages] = useState([])

const send=()=>{
  const message = document.getElementById('chatInput').value;
  socket.emit('message', {message, id});
  document.getElementById('chatInput').value ="";
  
// 10.0.1.20
}
console.log(messages)
  useEffect(()=>{
     socket = socketIO(ENDPOINT, {transports:['websocket']});
    
   socket.on('connect',()=>{
    // setMessages([...messages, data])
    console.log("Connected to server");
  setId(socket.id);
 })
 console.log(socket)

 socket.emit('joined',{user})
  
 socket.on('welcome', (data)=>{
// setMessages([...messages, data])
setMessages((prevMessages) => [...prevMessages, data]);
   console.log(data.user, data.message)
 })
 socket.on('userJoined', (data)=>{
  // setMessages([...messages, data])
  setMessages((prevMessages) => [...prevMessages, data]);
  console.log(data.user, data.message)
 })
 socket.on('leave',(data)=>{
  // setMessages([...messages, data])
  setMessages((prevMessages) => [...prevMessages, data]);
console.log(data.user, data.message)
 } )
return ()=>{
socket.emit('disconnected')
socket.off()
}
 },[])

 useEffect(()=>{
  socket.on('sendMessage',(data)=>{
    // setMessages([...messages, data])
    setMessages((prevMessages) => [...prevMessages, data]);
    console.log(data.user, data.message, data.id)
  })
  return ()=>{
// socket.off();
socket.off('sendMessage')
  }
 },[])
  return (
    <div className='chatPage'>
      <div className="chatContainer">
        <div className="header">

          <h2>C CHAT</h2>
        <a href='/'>
          <img src={closeIcon} alt="close" /></a>
        </div>

        <ReactScrollToBottom className="chatBox">
         {messages.map((item, i)=> <Message user={item.id ===id ? '':item.user} message ={item.message} classs ={item.id===id?'right' : 'left'}/>)}
        </ReactScrollToBottom>


        <div className="inputBox" >
<input  onKeyPress={(e)=> e.key==='Enter'? send() : null} type="text" id='chatInput' placeholder='enter here..' />
<button onClick={send} className='sendBtn'>
  <img src={sendLogo} alt="" />
</button>

        </div>
      </div>

     
    </div>
  )
}

export default Chat
