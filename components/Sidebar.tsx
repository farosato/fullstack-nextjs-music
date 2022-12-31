import NextLink from 'next/link'
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import NextImage from 'next/image'
import { usePlaylists } from '../lib/hooks'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/',
  },
]

// const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`)

const MenuItem = ({ name, route, icon = null }) => (
  <ListItem key={name} fontSize="16px">
    <LinkBox>
      <NextLink href={route} passHref>
        <LinkOverlay>
          {icon ? (
            <ListIcon as={icon} color="white" marginRight="20px" />
          ) : null}
          {name}
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  </ListItem>
)

const Sidebar = () => {
  const { playlists } = usePlaylists()
  return (
    <Box width="100%" height="100%" bg="black" color="gray" paddingX="25px">
      <Box height="100%" paddingY="20px">
        <Box marginBottom="20px" width="120px">
          <NextImage src="/logo.svg" width={120} height={60} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menu) => (
              <MenuItem
                name={menu.name}
                icon={menu.icon}
                route={menu.route}
                key={menu.name}
              />
            ))}
          </List>
        </Box>
        <Box>
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <MenuItem
                name={menu.name}
                icon={menu.icon}
                route={menu.route}
                key={menu.name}
              />
            ))}
          </List>
        </Box>
        <Divider marginY="20px" color="gray.600" />
        <Box height="61%" overflowY="auto" paddingBottom="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <MenuItem
                name={playlist.name}
                route={`/playlists/${playlist.id}`}
                key={playlist.id}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
