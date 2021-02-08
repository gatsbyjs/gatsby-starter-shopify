import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink } from 'gatsby'
import {
  Container,
  Box,
  Text,
  Grid,
  Heading,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiArrowRight as ArrowIcon } from 'react-icons/fi'
import Layout from '../components/layout'
import Spacer from '../components/spacer'

const IndexPage = () => {
  const bgGradient = useColorModeValue(
    `linear(to-b, white, gray.100)`,
    `linear(to-b, gray.900, gray.700)`
  )
  const headingColor = useColorModeValue(`black`, `white`)
  const fullWidthColor = useColorModeValue(`gray.700`, `gray.300`)
  const fullWidthBg = useColorModeValue(`gray.100`, `black`)

  return (
    <Layout>
      <Box bgGradient={bgGradient}>
        <Container py={[20, 28]}>
          <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']} gap={8}>
            <Flex
              direction="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Heading as="h1" color={headingColor}>
                Welcome to Hexagon Store!
              </Heading>
              <Spacer axis="vertical" size={3} />
              <Text fontSize="21px">
                Your place for neat stickers & shirts.
              </Text>
              <Spacer axis="vertical" size={9} />
              <Button
                as={GatsbyLink}
                to="/products/"
                colorScheme="blue"
                rightIcon={<ArrowIcon />}
              >
                See all products
              </Button>
            </Flex>
            <StaticImage
              src="../images/stickers-hero.jpg"
              alt="Stickers and Badges on a table"
              layout="constrained"
              quality={90}
              formats={['auto', 'webp', 'avif']}
              width={600}
            />
          </Grid>
        </Container>
      </Box>
      <Container my={[24, 32, 36, 40]}>
        <Flex alignItems="center" justifyContent="space-between" mb={8}>
          <Heading as="h2" fontSize="3xl">
            Stickers
          </Heading>
          <Button
            as={GatsbyLink}
            to="/products/stickers/"
            variant="ghost"
            rightIcon={<ArrowIcon />}
          >
            View all
          </Button>
        </Flex>
        <Grid
          templateColumns={['1fr', null, 'repeat(2, 1fr)']}
          gap={8}
          sx={{
            '.product-image-1': { order: 1 },
            '.product-image-2': { order: [3, null, 2] },
          }}
        >
          <StaticImage
            src="../images/stickers-one.jpg"
            alt="Stickers on a wall in New York City"
            layout="constrained"
            quality={90}
            formats={['auto', 'webp', 'avif']}
            width={600}
            className="product-image-1"
          />
          <StaticImage
            src="../images/stickers-two.jpg"
            alt="Stickers on a laptop lying on a table"
            layout="constrained"
            quality={90}
            formats={['auto', 'webp', 'avif']}
            width={600}
            className="product-image-2"
          />
          <Text fontSize="lg" maxWidth="65ch" order={[2, null, 3]}>
            Half-giant jinxes peg-leg gillywater broken glasses large black dog
            Great Hall. Nearly-Headless Nick now string them together, and
            answer me this, which creature would you be unwilling to kiss?
            Poltergeist sticking charm, troll umbrella stand flying cars golden
            locket Lily Potter. Pumpkin juice Trevor wave your wand out glass
            orbs, a Grim knitted hats.
          </Text>
          <Text fontSize="lg" maxWidth="65ch" order={4}>
            Half-giant jinxes peg-leg gillywater broken glasses large black dog
            Great Hall. Nearly-Headless Nick now string them together, and
            answer me this, which creature would you be unwilling to kiss?
            Poltergeist sticking charm, troll umbrella stand flying cars golden
            locket Lily Potter. Pumpkin juice Trevor wave your wand out glass
            orbs, a Grim knitted hats.
          </Text>
        </Grid>
      </Container>
      <Box py={[20, null, 28]} bg={fullWidthBg} color={fullWidthColor}>
        <Container>
          <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']} gap={8}>
            <Flex
              direction="column"
              alignItems="flex-start"
              justifyContent="center"
              maxWidth="60ch"
            >
              <Heading as="h2" color={headingColor}>
                About Us
              </Heading>
              <Spacer axis="vertical" size={3} />
              <Text fontSize="lg">
                Half-giant jinxes peg-leg gillywater broken glasses large black
                dog Great Hall. Nearly-Headless Nick now string them together,
                and answer me this, which creature would you be unwilling to
                kiss? Poltergeist sticking charm, troll umbrella stand flying
                cars golden locket Lily Potter. Pumpkin juice Trevor wave your
                wand out glass orbs, a Grim knitted hats.
              </Text>
            </Flex>
            <StaticImage
              src="../images/about-us.jpg"
              alt="Multiple people on the top of a mountain"
              layout="constrained"
              quality={90}
              formats={['auto', 'webp', 'avif']}
              width={600}
            />
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default IndexPage
