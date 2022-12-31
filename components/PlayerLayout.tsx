import { Box } from '@chakra-ui/layout'
import React from 'react'
import PlayerBar from './PlayerBar'
import Sidebar from './Sidebar'

const PlayerLayout = ({ children }) => (
  <Box width="100vw" height="100vh">
    <Box
      position="absolute"
      left="0"
      top="0"
      height="calc(100vh - 100px)"
      width="250px"
    >
      <Sidebar />
    </Box>
    <Box height="calc(100vh - 100px)" marginLeft="250px" marginBottom="100px">
      {children}
    </Box>
    <Box position="absolute" left="0" bottom="0">
      <PlayerBar />
    </Box>
  </Box>
)

export default PlayerLayout
