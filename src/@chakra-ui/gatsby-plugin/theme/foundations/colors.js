import { theme } from '@chakra-ui/react'

const defaultColors = theme.colors

const colors = {
  color: defaultColors.gray['800'],
  bg: defaultColors.white,
  primaryColorScheme: 'blue',
  primary: defaultColors.blue['500'],
  gradientTop: defaultColors.white,
  gradientBottom: defaultColors.gray['100'],
  headingColor: 'black',
  cardBg: defaultColors.gray['100'],
  cardLink: defaultColors.black,
  cardLinkHover: defaultColors.blue['600'],
  dark: {
    color: defaultColors.whiteAlpha['800'],
    bg: defaultColors.gray['900'],
    primary: defaultColors.blue['300'],
    gradientTop: defaultColors.gray['900'],
    gradientBottom: defaultColors.gray['700'],
    headingColor: 'white',
    cardBg: defaultColors.gray['700'],
    cardLink: defaultColors.white,
    cardLinkHover: defaultColors.blue['400'],
  },
}

export default colors
