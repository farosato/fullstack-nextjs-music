import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react'
import ReactHowler from 'react-howler'
import { useEffect, useRef, useState } from 'react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { formatTimeDuration } from '../lib/formatters'

const Player = ({ songs, activeSong }) => {
  const setActiveSong = useStoreActions((store) => store.setActiveSong)
  const [isPlaying, setIsPlaying] = useState(true)
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  )
  const [seek, setSeek] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const soundRef = useRef(null)
  const repeatRef = useRef(repeat)

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  useEffect(() => {
    let timerId
    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(f)
      }
      timerId = requestAnimationFrame(f)
      return () => cancelAnimationFrame(timerId)
    }
    cancelAnimationFrame(timerId)
  }, [isPlaying, isSeeking])

  useEffect(() => {
    setActiveSong(songs[index])
  }, [index, setActiveSong, songs])

  const setPlayState = (value) => setIsPlaying(value)

  const onShuffle = () => setShuffle((value) => !value)

  const onRepeat = () => setRepeat((value) => !value)

  const prevSong = () => {
    setIndex((state) => (state ? state - 1 : songs.length - 1))
  }

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length)
        if (next === state) return nextSong()
        return next
      }
      return state === songs.length - 1 ? 0 : state + 1
    })
  }

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      nextSong()
    }
  }

  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    setDuration(songDuration)
  }

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]))
    soundRef.current.seek(e[0])
  }

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={isPlaying}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            variant="link"
            fontSize="24px"
            aria-label="shuffle"
            icon={<MdShuffle />}
            color={shuffle ? 'white' : 'gray.600'}
            onClick={onShuffle}
          />
          <IconButton
            variant="link"
            fontSize="24px"
            aria-label="previous"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {isPlaying ? (
            <IconButton
              variant="link"
              fontSize="40px"
              aria-label="pause"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              variant="link"
              fontSize="40px"
              aria-label="play"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            variant="link"
            fontSize="24px"
            aria-label="next"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            variant="link"
            fontSize="24px"
            aria-label="repeat"
            icon={<MdOutlineRepeat />}
            color={repeat ? 'white' : 'gray.600'}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTimeDuration(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? duration.toFixed(2) : 0}
              id="player-range"
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.700">
                <RangeSliderFilledTrack bg="gray.500" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%">
            <Text fontSize="xs" textAlign="right">
              {formatTimeDuration(duration)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
