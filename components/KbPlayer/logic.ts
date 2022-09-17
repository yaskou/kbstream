import { useEffect, useRef, useState } from 'react'

const useLogic = () => {
  const ref = useRef<HTMLVideoElement>(null)

  const [progress, setProgress] = useState(0)

  const onHover = async () => {
    const el = ref.current
    el && await el.play()
  }

  const onUnHover = () => {
    const el = ref.current
    el && (() => {
      el.pause()
      el.currentTime = 0
    })()
  }

  useEffect(() => {
    const el = ref.current
    el && (() => {
      el.ontimeupdate = () => {
        setProgress(
          Math.ceil(el.currentTime * 100 / el.duration)
        )
      }
    })()
  }, [])

  return { ref, progress, onHover, onUnHover }
}

export default useLogic
