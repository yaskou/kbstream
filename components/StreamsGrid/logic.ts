import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const useLogic = () => {
  const [base64s, setBase64s] = useState<string[]>([])

  useEffect(() => {
    const socket = io()

    socket.on('connect', async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      })

      setInterval(() => {
        const recorder = new MediaRecorder(stream)

        recorder.ondataavailable = evt => {
          const reader = new FileReader()
  
          reader.onload = evt => {
            socket.emit('stream', evt.target?.result as string)
          }
  
          reader.readAsDataURL(evt.data)
        }

        recorder.start()

        setTimeout(() => {
          recorder.stop()
        }, 3000)
      }, 10000)
    })

    let chunks = [...base64s]
    socket.on('stream', (base64: string) => {
      chunks = [...chunks, base64]
      setBase64s(chunks)
    })
  }, [])

  return { base64s }
}

export default useLogic
