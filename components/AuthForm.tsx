import { Box, Flex, Input, Button, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { FC, useState } from 'react'
import { auth } from '../lib/mutations'

const AuthForm: FC<{ mode: 'signup' | 'signin' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box width="100vw" height="100vh" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px">
        <Box padding="20px">
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              marginBottom="10px"
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              marginBottom="10px"
            />
            <Button type="submit" colorScheme="whatsapp" isLoading={isLoading}>
              {mode}
            </Button>
            {mode === 'signup' ? (
              <Text marginTop="20px">
                Already have an account?{' '}
                <NextLink href="/signin" passHref>
                  <Link color="whatsapp.500">Sign in!</Link>
                </NextLink>
              </Text>
            ) : null}
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
