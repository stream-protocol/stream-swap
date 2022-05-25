import { Net } from 'shared/runtime'

/**
 * Constructor
 */
type Conf = {
  bidDefault: string
  askDefault: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    bidDefault: '2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj',
    askDefault: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
  },

  /**
   * Staging configurations
   */
  testnet: {
    bidDefault: '2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj',
    askDefault: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
  },

  /**
   * Production configurations
   */
  mainnet: {
    bidDefault: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    askDefault: '5P3giWpPBrVKL8QP8roKM7NsLdi3ie1Nc2b5r9mGtvwb',
  },
}

/**
 * Module exports
 */
export default conf
