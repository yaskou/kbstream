import { Box } from '@mui/material'
import { forwardRef } from 'react'

type Props = {
  src: string
}

const VideoPlayer = forwardRef<HTMLVideoElement, Props>((props, ref) => (
  <Box
    component="video"
    ref={ref}
    {...props}
    maxWidth="100%"
    maxHeight="100%"
    muted
    playsInline
    loop
  />
))

export default VideoPlayer
