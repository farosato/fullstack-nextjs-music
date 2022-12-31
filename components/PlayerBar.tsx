import { Box, Flex, Text } from '@chakra-ui/layout'
import { useStoreState } from 'easy-peasy'
import Player from './Player'

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs)
  const activeSong = useStoreState((state: any) => state.activeSong)

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      {activeSong ? (
        <Flex align="center">
          <Box width="30%" color="white" padding="20px">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
          <Box width="40%">
            <Player songs={songs} activeSong={activeSong} />
          </Box>
          <Box width="30%">{/* not implemented */}</Box>
        </Flex>
      ) : null}
    </Box>
  )
}

export default PlayerBar
