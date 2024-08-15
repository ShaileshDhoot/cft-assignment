import cors from 'cors'
import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import router from './routes/user.route.js'
import User from './model/user.model.js'
import jwt from 'jsonwebtoken'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.use(express.json())
app.use('/api/user', router)

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (!token) return next(new Error('Authentication error'))

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return next(new Error('Authentication error'))
    const user = await User.findByPk(decoded.id)
    if (!user) return next(new Error('Authentication error'))
    socket.data.user = user;
    next();
  });
});


io.on('connection', (socket) => {
  console.log('User connected:', socket.data.user.email)

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT 
server.listen(port, () => {
  console.log(`server running on port------------ ${port}`)
});
