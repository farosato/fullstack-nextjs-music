import { Box } from '@chakra-ui/layout'
import {
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useStoreActions } from 'easy-peasy'
import { formatDate, formatTimeDuration } from '../lib/formatters'

const SongsTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.setActiveSongs)
  const setActiveSong = useStoreActions((store: any) => store.setActiveSong)

  const handlePlay = (activeSong?) => {
    playSongs(songs)
    setActiveSong(activeSong || songs[0])
  }

  return (
    <Box
      bg="transparent"
      color="rgba(255,255,255,0.5)"
      width="full"
      height="full"
      padding="40px"
    >
      <Box marginBottom="20px">
        <IconButton
          icon={<BsFillPlayFill fontSize="28px" />}
          colorScheme="whatsapp"
          size="md"
          isRound
          aria-label="play"
          onClick={() => handlePlay()}
        />
      </Box>
      <Box>
        <TableContainer>
          <Table variant="unstyled">
            <Thead
              borderBottom="1px solid"
              borderColor="rgba(255,255,255,0.03)"
            >
              <Tr>
                <Th>#</Th>
                <Th>Title</Th>
                <Th>Date Added</Th>
                <Th>
                  <AiOutlineClockCircle />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {songs.map((song, i) => (
                <Tr
                  key={song.id}
                  cursor="pointer"
                  sx={{
                    transition: 'all .5s',
                    '&:hover': {
                      bg: 'rgba(255,255,255,0.05)',
                    },
                  }}
                  onClick={() => handlePlay(song)}
                >
                  <Td>{i + 1}</Td>
                  <Td color="white">{song.name}</Td>
                  <Td>{formatDate(song.createdAt)}</Td>
                  <Td>{formatTimeDuration(song.duration)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default SongsTable
