import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import apiRoutes from './routes/api'

const uri = 'mongodb://test:test123@ds125574.mlab.com:25574/nodejs-boilerplate'
mongoose.set('useCreateIndex', true)

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection

connection.once('open', () =>
  console.log('MongoDB database connection established....')
)
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = 5000

app.use(morgan('dev'))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

app.use(limiter)

app.use(bodyParser.json())

app.use('/api/v1/', apiRoutes)

io.on('connection', (socket) => {
  console.log('A new web socket connection has been established....')
  socket.emit('message', 'Welcome to chat')
})

server.listen(port, () =>
  console.log(`Server listening on: http://localhost:${port}`)
)
