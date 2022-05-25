import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Button } from 'antd'
import { PlatformButtonProps } from './index'

import useStreamswap from 'app/hooks/Streamswap'
import { streamlpState } from 'app/constant/streamLpState'
import { AppDispatch } from 'app/model'
import { setLoadingStreamswap, updateRoute } from 'app/model/route.controller'

let timeout: NodeJS.Timeout

const SwapButtonstream = ({
  loading,
  disabled,
  children,
  onSwap,
}: PlatformButtonProps) => {
  const { state: streamlpState } = useLocation<streamlpState>()
  const dispatch = useDispatch<AppDispatch>()
  const { swap, bestRoute } = useStreamswap(streamlpState?.poolAddress)

  const setRoute = useCallback(async () => {
    if (timeout) clearTimeout(timeout)
    await dispatch(updateRoute({ ...bestRoute }))
    setTimeout(() => {
      dispatch(
        setLoadingStreamswap({ loadingStreamswap: false, loadingJupSwap: true }),
      )
    }, 500)
  }, [bestRoute, dispatch])

  useEffect(() => {
    setRoute()
  }, [setRoute])

  return (
    <Button
      type="primary"
      onClick={() => onSwap(swap)}
      loading={loading}
      disabled={disabled}
      block
    >
      {children}
    </Button>
  )
}

export default SwapButtonstream
