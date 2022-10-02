import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const useLogic = () => {
  const [base64s, setBase64s] = useState<string[]>([]) // The state of remote streams in base64

  useEffect(() => {
    const socket = io() // New WebSocket connection

    socket.on('connect', async () => {

      // Try using camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        })

        // Record stream every 10 seconds
        setInterval(() => {
          const recorder = new MediaRecorder(stream) // Initialize media recorder

          recorder.ondataavailable = evt => {
            const reader = new FileReader() // Initialize blob compiler

            reader.onload = evt => {
              socket.emit('stream', evt.target?.result as string) // Send stream
            }

            reader.readAsDataURL(evt.data) // Record exchange to base64
          }

          recorder.start() // Start recorder

          // After 3 seconds, stop the recorder
          setTimeout(() => {
            recorder.stop()
          }, 3000)
        }, 10000)
      }
      // The user doesn't hope to use a camera so do nothing
      catch { }
    })

    let chunks: string[] = []
    socket.on('stream', (base64: string) => {

      /*--------------------------------
        Set state max 15 piece of base64
        Remove from old data
      --------------------------------*/
      chunks = [...chunks.length > 14 ? chunks.slice(1, 15) : chunks, base64]
      setBase64s(chunks)
    })
  }, [])

  return { base64s }
}

export default useLogic
