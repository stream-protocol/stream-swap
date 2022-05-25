import { Env } from 'shared/runtime'

if (
  typeof process.env.REACT_APP_ID !== 'string' ||
  typeof process.env.REACT_APP_NAME !== 'string' ||
  typeof process.env.REACT_APP_URL !== 'string'
)
  throw new Error(
    'Please add REACT_APP_ID, REACT_APP_NAME, REACT_APP_URL in .env.local!',
  )

/**
 * Constructor
 */

type Conf = {
  defaultAppId: string
  extra: StreamReg
  StreamReg: string
}

const DEFAULT_APP_ID = process.env.REACT_APP_ID
const devApp = {
  [DEFAULT_APP_ID]: {
    url: process.env.REACT_APP_URL,
    appId: DEFAULT_APP_ID,
    name: process.env.REACT_APP_NAME,
    author: {
      name: process.env.REACT_APP_AUTHOR_NAME || '',
      email: process.env.REACT_APP_AUTHOR_EMAIL || '',
    },
    tags: (process.env.REACT_APP_TAGS || '')
      .split(',')
      .map((tag) => tag.trim()),
    description: process.env.REACT_APP_DESCRIPTION || '',
    verified: false,
  },
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    defaultAppId: DEFAULT_APP_ID,
    extra: devApp,
    StreamReg: 'https://github.com/stream-protocol/stream-reg/register.json',
  },

  /**
   * Staging configurations
   */
  staging: {
    defaultAppId: DEFAULT_APP_ID,
    extra: devApp,
    StreamReg: 'https://github.com/stream-protocol/stream-reg/register.json',
  },

  /**
   * Production configurations
   */
  production: {
    defaultAppId: DEFAULT_APP_ID,
    extra: {},
    StreamReg: 'https://github.com/stream-protocol/stream-reg/register.json',
  },
}

/**
 * Module exports
 */
export default conf
