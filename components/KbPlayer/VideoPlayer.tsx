import { Box } from '@mui/material';
import { forwardRef } from 'react';

type Props = {
  src: string;
};

// Using ref object in props so use forwardRef
const VideoPlayer = forwardRef<HTMLVideoElement, Props>(function VideoPlayer(
  props,
  ref
) {
  return (
    <Box
      component='video'
      ref={ref}
      {...props}
      maxWidth='100%'
      maxHeight='100%'
      muted
      playsInline // Fix safari bug
      loop // During mouse hover, video loops
    />
  );
});

export default VideoPlayer;
