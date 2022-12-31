import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

const GradientLayout = ({
  color,
  children,
  title,
  subtitle,
  description,
  image,
  roundImage,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box>
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? 'full' : '3px'}
          />
        </Box>
        <Box paddingX="20px" color="white" lineHeight="50px">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="7xl" fontWeight="extrabold">
            {title}
          </Text>
          <Text fontSize="small">{description}</Text>
        </Box>
      </Flex>
      <Box>{children}</Box>
    </Box>
  )
}

export default GradientLayout
