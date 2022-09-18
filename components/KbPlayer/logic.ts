import { useEffect, useRef, useState } from 'react'

const useLogic = () => {
  const ref = useRef<HTMLVideoElement>(null) // Create ref object to use it in video element

  const [progress, setProgress] = useState(0) // A state of video playback status

  // When mouse hover, video plays
  const onHover = async () => {
    const el = ref.current
    el && await el.play()
  }

  // When mouse leaves this element, video stops and returns to the beginning
  const onUnHover = () => {
    const el = ref.current
    el && (() => {
      el.pause()
      el.currentTime = 0
    })()
  }

  useEffect(() => {
    const el = ref.current

    // When it is caused timeupdate event, set this state
    el && (() => {
      el.ontimeupdate = () => {
        setProgress(
          Math.ceil(el.currentTime * 100 / el.duration) // As a percent
        )
      }
    })()
  }, [])

  return { ref, progress, onHover, onUnHover }
}

export default useLogic
