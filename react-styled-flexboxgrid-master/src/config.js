
import { css } from 'styled-components'

const THEME_CONF = 'flexboxgrid'
export const BASE_CONF = {
  gridSize: 12,
  gutterWidthUnits: 'px',
  gutterWidth: 30,
  outerMarginUnits: 'px',
  outerMargin: 30,
  mediaQuery: 'only screen',
  containerUnits: 'px',
  breakpointUnits: 'px',
  container: {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
}

const configCache = []
const makeCacheId = props => JSON.stringify((props.theme && props.theme[THEME_CONF]) || {})
const resolveConfig = props => {
  const themeConf = (props.theme && props.theme[THEME_CONF]) || {}

  const conf = {
    ...BASE_CONF,
    ...themeConf,
    container: {
      ...BASE_CONF.container,
      ...themeConf.container
    },
    breakpoints: {
      ...BASE_CONF.breakpoints,
      ...themeConf.breakpoints
    }
  }

  conf.media = Object.keys(conf.breakpoints).reduce((media, breakpoint) => {
    const breakpointWidth = conf.breakpoints[breakpoint]
    console.log('unit', conf.breakpointUnits)
    media[breakpoint] = makeMedia(
      [
        conf.mediaQuery,
        breakpoint !== 0 && `(min-width: ${breakpointWidth}${conf.breakpointUnits})`
      ]
        .filter(Boolean)
        .join(' and ')
    )
    return media
  }, {})

  return conf
}

export const DIMENSION_NAMES = ['xs', 'sm', 'md', 'lg']

export default function config (props) {
  const cacheId = makeCacheId(props)
  if (configCache[0] === cacheId) {
    return configCache[1]
  }

  const conf = resolveConfig(props)

  configCache[0] = cacheId
  configCache[1] = conf

  return conf
}

function makeMedia (media) {
  return (...args) => css`
    @media ${media} {
      ${css(...args)}
    }
  `
}
