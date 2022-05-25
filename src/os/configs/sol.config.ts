import { Net, rpc } from 'shared/runtime'

const SOLVARS = {
  spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
}

/**
 * Constructor
 */
type Conf = {
  node: string
  swapAddress: string
  taxmanAddress: string
} & typeof SOLVARS

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    ...SOLVARS,
    node: rpc,
    swapAddress: 'Fv5KYj23eeivL7n2Qs3JCpyFNBvzcHMNSDf4fMypr8YV',
    taxmanAddress: '8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9',
  },

  /**
   * Staging configurations
   */
  testnet: {
    ...SOLVARS,
    node: rpc,
    swapAddress: 'Fv5KYj23eeivL7n2Qs3JCpyFNBvzcHMNSDf4fMypr8YV',
    taxmanAddress: '8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9',
  },

  /**
   * Production configurations
   */
  mainnet: {
    ...SOLVARS,
    node: rpc,
    swapAddress: 'SSW7ooZ1EbEognq5GosbygA3uWW1Hq1NsFq6TsftCFV',
    taxmanAddress: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
  },
}

/**
 * Module exports
 */
export default conf
