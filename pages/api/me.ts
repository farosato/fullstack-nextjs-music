import { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '../../lib/auth'
import prisma from '../../lib/prisma'

const me = async (req: NextApiRequest, res: NextApiResponse, user) => {
  const playlistCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  })
  res.json({ ...user, playlistCount })
}

export default withAuth(me)
