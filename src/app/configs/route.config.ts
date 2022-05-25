import { Net } from 'shared/runtime'

/**
 * Contructor
 */
type Config = {
  assetsRoute: string
}

const config: Record<Net, Config> = {
  /**
   * Development configurations
   */
  devnet: {
    assetsRoute: '/app/stream_assets',
  },

  /**
   * Staging configurations
   */
  testnet: {
    assetsRoute: '/app/stream_assets',
  },

  /**
   * Production configurations
   */
  mainnet: {
    assetsRoute: '/app/stream_assets',
  },
}

export default config
