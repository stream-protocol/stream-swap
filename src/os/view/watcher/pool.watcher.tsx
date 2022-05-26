import { Fragment, useCallback, useEffect } from 'react'
import { account } from '@stream-protocol/swap-js'

import {
  useRootDispatch,
  useRootSelector,
  RootDispatch,
  RootState,
} from 'os/store'
import { getPools, upsetPool } from 'os/store/pools.reducer'
import configs from 'os/configs'

const {
  sol: { taxmanAddress },
} = configs

// Watch id
let watchId = 0

const PoolWatcher = () => {
  const dispatch = useRootDispatch<RootDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      if (!account.isAddress(walletAddress)) return
      await dispatch(getPools()).unwrap()
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of pools',
      })
    }
  }, [dispatch, walletAddress])
  // Watch account changes
  const watchData = useCallback(async () => {
    if (watchId) return console.warn('Already watched')
    const { swap } = window.stream || {}
    const filters = [{ memcmp: { bytes: taxmanAddress, offset: 65 } }]
    watchId = swap?.watch((er: string | null, re: any) => {
      if (er) return console.error(er)
      const { address, data } = re
      return dispatch(upsetPool({ address, data }))
    }, filters)
  }, [dispatch])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await window.stream.swap.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default PoolWatcher
