import { useCallback, useState, useEffect, Fragment, ReactNode } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { utils } from '@stream-protocol/swap-js'

import ValidateSwap from '../validateSwap'
import SwapButtonstream from './swapButtonstream'

import { AppState, AppDispatch } from 'app/model'
import { explorer } from 'shared/util'
import { PriceImpact } from 'app/constant/swap'
import { updateBidData } from 'app/model/bid.controller'
import { updateAskData } from 'app/model/ask.controller'
import { useWrapSol } from 'app/hooks/useWrapSol'
import { useSwapStatus } from 'app/hooks/useSwapStatus'
import SwapButtonJup from './swapButtonJup'
import { SwapPlatform } from 'app/model/route.controller'

export type PlatformSwap = () => Promise<{
  txId: any
  dst: any
}>

export type PlatformButtonProps = {
  loading: boolean
  disabled: boolean
  children: ReactNode
  onSwap: (swap: PlatformSwap) => void
}

const SwapAction = ({
  onCallback = () => {},
  forceSwap = false,
}: {
  onCallback?: () => void
  forceSwap?: boolean
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [validSwap, setValidSwap] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    route: { priceImpact, amount: bestAmount, loadingStreamswap, platform },
    bid: {
      mintInfo: { decimals: bidMintDecimals },
      priority: bidPriority,
      amount: bidAmount,
    },
    ask: {
      mintInfo: { decimals: askMintDecimals },
      priority: askPriority,
    },
    settings: { advanced },
  } = useSelector((state: AppState) => state)

  const { wrapAmount, wrapSol } = useWrapSol()
  const { disabled } = useSwapStatus()

  const onSwap = async (swapPlatform: PlatformSwap) => {
    try {
      setLoading(true)
      // check wrap sol
      if (wrapAmount) await wrapSol()

      const { txId } = await swapPlatform()
      window.notify({
        type: 'success',
        description: 'Swap successfully. Click to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      setValidSwap(txId)
      dispatch(updateBidData({ amount: '' }))
      return onCallback()
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      setValidSwap('')
      return setLoading(false)
    }
  }

  const setAskData = useCallback(() => {
    if (askPriority < bidPriority) {
      dispatch(
        updateAskData({
          amount: utils.undecimalize(bestAmount, askMintDecimals),
        }),
      )
    }
  }, [askMintDecimals, askPriority, bestAmount, bidPriority, dispatch])
  useEffect(() => {
    setAskData()
  }, [setAskData])

  const setBidData = useCallback(() => {
    if (bidPriority < askPriority) {
      dispatch(
        updateBidData({
          amount: utils.undecimalize(bestAmount, bidMintDecimals),
        }),
      )
    }
  }, [askPriority, bestAmount, bidMintDecimals, bidPriority, dispatch])
  useEffect(() => {
    setBidData()
  }, [setBidData])

  const tooHighImpact =
    !advanced && priceImpact > PriceImpact.acceptableSwap && !forceSwap

  const content = tooHighImpact
    ? 'Too High Price Impact'
    : forceSwap
    ? 'Swap Anyway'
    : 'Swap'

  const validSwapValue = Number(bestAmount)
  const isUseJup =
    !loadingStreamswap &&
    !!Number(bidAmount) &&
    (!validSwapValue || platform === SwapPlatform.JupiterAggregator)

  return (
    <Fragment>
      {isUseJup ? (
        <SwapButtonJup
          onSwap={onSwap}
          disabled={disabled || tooHighImpact}
          loading={loading}
        >
          {content}
        </SwapButtonJup>
      ) : (
        <SwapButtonstream
          onSwap={onSwap}
          disabled={disabled || tooHighImpact}
          loading={loading}
        >
          {content}
        </SwapButtonstream>
      )}
      <ValidateSwap txId={validSwap} />
    </Fragment>
  )
}

export default SwapAction
