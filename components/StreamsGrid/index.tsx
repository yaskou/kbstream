import { Grid } from '@mui/material'
import KbPlayer from '../KbPlayer'
import useLogic from './logic'

const StreamsGrid = () => {
  const { base64s } = useLogic()

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 6 }}>
      {base64s.map((base64, index) => (
        <Grid item xs={2} sm={2} md={2} key={index}>
          <KbPlayer src={base64} />
        </Grid>
      ))}
    </Grid>
  )
}

export default StreamsGrid
