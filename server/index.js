const http = require("http")
const express = require('express')
const cors = require('cors')
const socketIO = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socketIO(server)
const port = 9000 || process.env.PORT
const users =[{}];


app.use(cors());
app.get('/',(req, res)=>{
  res.send("ApI is comminggg...")
})
io.on("connection",(socket)=>{
  console.log("New Connection from backend..")


  socket.on('joined',({user})=>{
    users[socket.id] = user
console.log(` ${user} has joined`)

socket.broadcast.emit('userJoined', {user:"admin", message:`${users[socket.id]} user has joined`})

socket.emit('Welcome', {user:"admin", message:`welcome to the chat, ${users[socket.id]}`})
  })
  socket.on('message',({message, id})=>{
    io.emit('sendMessage',{user:users[id],message,id})
  })

 socket.on('disconnect',()=>{
  socket.broadcast.emit('leave',{user:"Admin", message:`user has left..`})
  console.log(`user left`)
 })
})


server.listen(port,()=>{
  console.log(`server started at port 9000`)
})


