import * as React from 'react'
import { Grid, Container, Text, Stack, Link } from '@chakra-ui/react'
import ThemeToggle from './theme-toggle'

const Footer = () => {
  return (
    <Container as="footer" py={16}>
      <Grid
        gridTemplateColumns={['1fr', '1fr', '1fr auto 1fr']}
        alignItems="center"
        gap={[3, 3, 12]}
      >
        <Text textAlign={['center', 'center', 'left']}>
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </Text>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent={['center', 'center', 'flex-end']}
        >
          <span>Theme:</span> <ThemeToggle />
        </Stack>
        <Link justifySelf={['center', 'center', 'flex-end']} href="#">
          Source Code
        </Link>
      </Grid>
    </Container>
  )
}

export default Footer
