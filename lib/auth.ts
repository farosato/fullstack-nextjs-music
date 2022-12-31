import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

export const validateToken = async (token) => {
  const { id } = jwt.verify(token, process.env.JWT_SIGNING_SECRET)
  const user = await prisma.user.findUnique({
    where: { id },
  })
  if (!user) {
    throw Error('User not found')
  }
  return user
}

export const withAuth = (handler) => {
  const handlerWithAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[process.env.USER_ACCESS_COOKIE]
    if (token) {
      try {
        const user = await validateToken(token)
        return handler(req, res, user)
      } catch (error) {
        // pass
      }
    }
    res.status(401)
    res.json({ error: 'Unauthorized' })
  }
  return handlerWithAuth
}
