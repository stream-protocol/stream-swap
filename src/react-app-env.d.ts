/// <reference types="react-scripts" />

/**
 * Declare global
 */
type streamNotification = {
  type: 'error' | 'warning' | 'success' | 'info'
  description: string
  onClick?: () => void
}
interface Window {
  // stream
  stream: {
    wallet: import('@stream-protocol/swap-js').WalletInterface
    lamports: import('@stream-protocol/swap-js').Lamports
    splt: import('@stream-protocol/swap-js').SPLT
    swap: import('@stream-protocol/swap-js').Swap
  }
  // IPFS
  ipfs?: ReturnType<import('ipfs-core').create>
  // Utility
  notify: ({ type, description, onClick }: streamNotification) => void
  // Partner wallets
  coin98: any
  solana: any
  Slope: any
  solflare: any
  clover_solana: any
}

// For bigint serialization
interface BigInt {
  toJSON: (this: bigint) => string
}

// Application ID management
type AppIds = Array<string>
// Application manifest
type ComponentManifest = {
  url: string
  appId: string
  name: string
  author: {
    name: string
    email: string
  }
  tags: string[]
  description: string
  verified: boolean
}
// List of application manifests
type StreamReg = Record<string, ComponentManifest | undefined>
// Coingecko Data
type CgkData = {
  icon: any
  symbol: any
  name: any
  address: any
  rank: any
  price: number
  priceChange: any
  totalVolume: any
}

/**
 * Declare module
 */
declare module '*.md'
declare module '@stream-protocol/context' {
  export * from 'os/store/context'
}
declare module '@stream-protocol/providers' {
  export * from 'os/providers'
}

/**
 * Declare namespace
 */
declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': any
  }
}
