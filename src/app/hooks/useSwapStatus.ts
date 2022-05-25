import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_WSOL, utils } from '@stream-protocol/swap-js'
import { useWallet } from '@stream-protocol/providers'

import { AppState } from 'app/model'
import useAccountBalance from 'shared/hooks/useAccountBalance'

export const useSwapStatus = () => {
  const {
    route: { best, loadingJupSwap, loadingStreamswap },
    bid: {
      amount: bidAmount,
      accountAddress: bidAccountAddress,
      mintInfo: { address: bidMintAddress, decimals: bidMintDecimals },
    },
    ask: {
      amount: askAmount,
      mintInfo: { address: askMintAddress },
    },
  } = useSelector((state: AppState) => state)

  const {
    wallet: { lamports },
  } = useWallet()

  const { amount: bidBalance } = useAccountBalance(bidAccountAddress)

  const availableBid = useMemo((): string => {
    if (bidMintAddress !== DEFAULT_WSOL)
      return utils.undecimalize(bidBalance, bidMintDecimals)
    // So estimate max = 0.01 fee -> multi transaction.
    const estimateFee = utils.decimalize(0.01, bidMintDecimals)
    const max = lamports + bidBalance - estimateFee
    if (max <= bidBalance)
      return utils.undecimalize(bidBalance, bidMintDecimals)
    return utils.undecimalize(max, bidMintDecimals)
  }, [bidBalance, bidMintAddress, bidMintDecimals, lamports])

  const disabled =
    !best.length ||
    !Number(bidAmount) ||
    !Number(askAmount) ||
    Number(bidAmount) > Number(availableBid) ||
    bidMintAddress === askMintAddress

  const loading = loadingJupSwap || loadingStreamswap
  return { disabled, loading }
}
