import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      process.env.JWT_SIGNING_SECRET,
      { expiresIn: '8h' }
    )

    res.setHeader(
      'Set-Cookie',
      cookie.serialize(process.env.USER_ACCESS_COOKIE, token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    )

    res.json(user)
  } else {
    res.status(401)
    res.json({ error: 'Wrong email or password' })
  }
}
