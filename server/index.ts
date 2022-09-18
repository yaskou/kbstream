import { createServer } from 'http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev }) // Accept hot reload in dev mode
const handle = app.getRequestHandler() // Request handler

app.prepare().then(() => {

  // Create a http server
  const httpServer = createServer(async (req, res) => {
    try {
      await handle(req, res) // handle request
    }
    catch (err) {

      // Server error (500)
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

    // Start the server
    .listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on http://${hostname}:${port}`)
    })

  const io = new Server().listen(httpServer) // Socket.io server with this http server
  io.on('connection', socket => {

    // When base64 is received, broadcast to other everyone
    socket.on('stream', (base64: string) => {
      socket.broadcast.emit('stream', base64)
    })
  })
})
