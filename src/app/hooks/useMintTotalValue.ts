import { useCallback } from './streamswap/node_modules/react'
import { Swap, utils } from './streamswap/node_modules/@stream-protocol/swap-js'
import { useMint, usePool } from './streamswap/node_modules/@stream-protocol/providers'

import { fetchCGK } from 'shared/util'

// Refer: stream-protocol-lp
export const useMintTotalValue = () => {
  const { tokenProvider, getMint } = useMint()
  const { pools } = usePool()

  const getTokenUsd = useCallback(
    async (mintAddress: string, amount: bigint) => {
      try {
        const tokenInfo = await tokenProvider.findByAddress(mintAddress)
        const ticket = tokenInfo?.extensions?.coingeckoId
        if (!ticket) throw new Error('Cant not find coingeckoId')

        const cgkData = await fetchCGK(ticket)
        return (
          Number(utils.undecimalize(amount, tokenInfo.decimals)) * cgkData.price
        )
      } catch (error) {
        return 0
      }
    },
    [tokenProvider],
  )

  const getMintTotalValue = useCallback(
    async ({
      mintAddress,
      amount,
    }: {
      mintAddress: string
      amount: bigint
    }) => {
      if (!amount) return 0
      const tokenInfo = await tokenProvider.findByAddress(mintAddress)
      if (tokenInfo) return getTokenUsd(mintAddress, amount)

      // Get Mint Liquidity Pool Token total value
      const poolData = Object.values(pools).find(
        (pool) => pool.mint_lpt === mintAddress,
      )
      if (!poolData) return 0
      const { reserve_a, reserve_b, mint_a, mint_b } = poolData
      if (reserve_a * reserve_b === BigInt(0)) return 0
      const {
        [mintAddress]: { supply },
      } = await getMint({ address: mintAddress })
      const { deltaA, deltaB } = Swap.oracle.withdraw(
        amount,
        supply,
        reserve_a,
        reserve_b,
      )
      const balanceA: number = await getMintTotalValue({
        mintAddress: mint_a,
        amount: deltaA,
      })
      const balanceB: number = await getMintTotalValue({
        mintAddress: mint_b,
        amount: deltaB,
      })
      return balanceA + balanceB
    },
    [getMint, getTokenUsd, tokenProvider, pools],
  )
  return { getMintTotalValue }
}
