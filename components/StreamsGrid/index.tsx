import { Grid } from '@mui/material'
import KbPlayer from '../KbPlayer'
import useLogic from './logic'

const StreamsGrid = () => {
  const { base64s } = useLogic()

  return (
    <Grid container spacing={2}>
      {base64s.map(base64 => (
        <Grid item key={base64}>
          <KbPlayer src={base64} />
        </Grid>
      ))}
    </Grid>
  )
}

export default StreamsGrid
