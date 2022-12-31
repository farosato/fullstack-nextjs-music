import GradientLayout from '../../components/GradientLayout'
import SongsTable from '../../components/SongsTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'

const colors = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
]
const randomColor = (i) => colors[i % colors.length]

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      color={randomColor(playlist.id)}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user
  try {
    const token = req.cookies[process.env.USER_ACCESS_COOKIE]
    user = await validateToken(token)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }
  const playlist = await prisma.playlist.findFirst({
    where: {
      userId: user.id,
      id: +query.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })
  return {
    props: { playlist },
  }
}

export default Playlist
