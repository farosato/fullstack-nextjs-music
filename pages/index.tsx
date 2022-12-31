import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, SkeletonText } from '@chakra-ui/react'
import GradientLayout from '../components/GradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  const { user } = useMe()
  const color = 'red'
  return (
    <GradientLayout
      color={color}
      title={
        user.firstName && user.lastName ? (
          `${user.firstName} ${user.lastName}`
        ) : (
          <SkeletonText
            noOfLines={1}
            skeletonHeight="14"
            startColor={`${color}.300`}
            endColor={`${color}.800`}
          />
        )
      }
      subtitle="profile"
      description={`${user.playlistCount ?? 0} Public Playlists`}
      image="https://frontendmasters.github.io/fullstack-app-next-website/images/profile.png"
      roundImage
    >
      <Box paddingX="40px" color="white">
        <Box marginBottom="20px">
          <Text fontSize="xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="small">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box
              marginX="15px"
              bg="gray.700"
              borderRadius="4px"
              padding="15px"
              width="10%"
            >
              <Image
                src="https://placekitten.com/300/300"
                borderRadius="full"
              />
              <Box marginTop="20px">
                <Text fontSize="md" fontWeight="bold">
                  {artist.name}
                </Text>
                <Text fontSize="small">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  return {
    props: { artists },
  }
}

export default Home
