import * as React from 'react'
import { Container, Heading, Text } from '@chakra-ui/react'
import Layout from '../components/layout'

const NotFoundPage = () => {
  return (
    <Layout>
      <Container my={20}>
        <Heading>Page Not Found</Heading>
        <Text fontSize="lg" mt={6}>
          Sorry, we couldn't find what you were looking for
        </Text>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
