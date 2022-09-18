import { AppBar, Link, Toolbar, Typography } from '@mui/material'

const Header = () => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6" component="div" flexGrow={1}>
        KbStream
      </Typography>
      <Link href="https://github.com/yaskou/kbstream" underline="none">
        GitHub
      </Link>
    </Toolbar>
  </AppBar>
)

export default Header
