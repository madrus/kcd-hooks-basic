import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Counter } from './Counter'

const App = () => (
  <Box height={'300px'} width={'300px'}>
    <CssBaseline />
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Counter />
    </Box>
  </Box>
)

export default App
