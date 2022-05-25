import { Net } from 'shared/runtime'

/**
 * Constructor
 */
type Conf = {
  node: string
  cluster: 'devnet' | 'testnet' | 'mainnet-beta'
  spltAddress: string
  splataAddress: string
  swapAddress: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: 'https://api.devnet.solana.com',
    cluster: 'devnet',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    swapAddress: 'Fv5KYj23eeivL7n2Qs3JCpyFNBvzcHMNSDf4fMypr8YV',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    cluster: 'testnet',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    swapAddress: '',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://ssc-dao.genesysgo.net',
    cluster: 'mainnet-beta',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    swapAddress: 'SSW7ooZ1EbEognq5GosbygA3uWW1Hq1NsFq6TsftCFV',
  },
}

/**
 * Module exports
 */
export default conf
