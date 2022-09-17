import { createServer } from 'http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      await handle(req, res)
    }
    catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err?: any) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })

  const io = new Server().listen(httpServer)
  io.on('connection', socket => {
    socket.on('stream', (base64: string) => {
      socket.broadcast.emit('stream', base64)
    })
  })
})
