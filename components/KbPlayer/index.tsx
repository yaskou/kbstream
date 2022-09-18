import { Box, LinearProgress } from '@mui/material'
import useLogic from './logic'
import VideoPlayer from './VideoPlayer'

type Props = {
  src: string
}

const KbPlayer = ({ src }: Props) => {
  const { ref, progress, onHover, onUnHover } = useLogic()

  return (
    <Box
      // Control playback state by cursor position
      onMouseEnter={onHover}
      onMouseLeave={onUnHover}

      // Like youtube
      display="flex"
      flexDirection="column"

      // Aspect ratio always is 16:9
      sx={{ aspectRatio: '16 / 9' }}
    >
      <VideoPlayer ref={ref} src={src} />
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  )
}

export default KbPlayer
