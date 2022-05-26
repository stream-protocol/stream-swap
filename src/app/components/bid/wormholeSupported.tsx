import { lazy, Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@stream-protocol/swap-js'

import { Popover, Tag } from 'antd'

import { AppState } from 'app/model'
import { checkAttestedWormhole } from 'app/helper/wormhole'
import { randomColor } from 'shared/util'

const WORMHOLE_COLOR = '#141e30'

const FrameWormhole = () => {
  const FrameWormhole = lazy(() =>
    // @ts-ignore
    import('@frame/stream_assets/bootstrap').then((module) => ({
      default: module.FrameWormhole,
    })),
  )
  return (
    <Suspense fallback="Loading...">
      <FrameWormhole />
    </Suspense>
  )
}

const WormholeSupported = () => {
  const [wormholeSupported, setWormholeSupported] = useState(false)
  const {
    bid: { mintInfo },
  } = useSelector((state: AppState) => state)
  const { address: mintAddress } = mintInfo || {}

  useEffect(() => {
    ;(async () => {
      if (!account.isAddress(mintAddress)) return setWormholeSupported(false)
      const wormholeSupported = await checkAttestedWormhole(mintAddress)
      return setWormholeSupported(wormholeSupported)
    })()
  }, [mintAddress])

  if (!wormholeSupported) return null
  return (
    <Popover
      overlayInnerStyle={{
        background: 'transparent',
        width: 375,
        boxShadow: 'none',
      }}
      trigger="click"
      content={<FrameWormhole />}
    >
      <Tag
        style={{
          margin: 0,
          borderRadius: 4,
          color: randomColor(WORMHOLE_COLOR),
          cursor: 'pointer',
        }}
        color={randomColor(WORMHOLE_COLOR, 0.2)}
      >
        Wormhole Bridge
      </Tag>
    </Popover>
  )
}

export default WormholeSupported
