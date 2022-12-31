import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { withAuth } from '../../lib/auth'

const playlists = async (req: NextApiRequest, res: NextApiResponse, user) => {
  const userPlaylists = await prisma.playlist.findMany({
    where: { userId: user.id },
    orderBy: { id: 'desc' },
  })
  res.json(userPlaylists)
}

export default withAuth(playlists)
