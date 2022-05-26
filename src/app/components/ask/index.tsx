import { useMemo, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { account } from '@stream-protocol/swap-js'
import { useMint, usePool, useUI, useWallet } from '@stream-protocol/providers'

import { Row, Col, Typography, Space } from 'antd'
import { SelectionInfo } from '../selection/mintSelection'
import NumericInput from 'shared/antd/numericInput'
import { MintSelection, MintSymbol } from 'shared/antd/mint'

import configs from 'app/configs'
import { numeric } from 'shared/util'
import { AppDispatch, AppState } from 'app/model'
import { updateAskData } from 'app/model/ask.controller'
import { useMintSelection } from 'app/hooks/useMintSelection'
import { streamlpState } from 'app/constant/streamLpState'
import useAccountBalance from 'shared/hooks/useAccountBalance'
import { setLoadingStreamswap } from 'app/model/route.controller'

const Ask = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { pools } = usePool()
  const { getDecimals } = useMint()
  const {
    ui: { theme },
  } = useUI()
  const {
    ask: { amount, accountAddress, mintInfo, poolAddresses },
  } = useSelector((state: AppState) => state)
  const { state } = useLocation<streamlpState>()
  const { balance: maxBalance } = useAccountBalance(accountAddress)
  const selectionDefault = useMintSelection(configs.swap.askDefault)
  const poolAddress = state?.poolAddress

  // Select default
  useEffect(() => {
    if (account.isAddress(accountAddress) || account.isAddress(poolAddress))
      return
    dispatch(setLoadingStreamswap({ loadingStreamswap: true }))
    dispatch(updateAskData(selectionDefault))
  }, [accountAddress, dispatch, poolAddress, selectionDefault])

  // Compute selection info
  const selectionInfo: SelectionInfo = useMemo(
    () => ({ mintInfo, poolAddresses }),
    [mintInfo, poolAddresses],
  )

  // Handle amount
  const onAmount = (val: string) => {
    dispatch(setLoadingStreamswap({ loadingStreamswap: true }))
    dispatch(updateAskData({ amount: val, prioritized: true }))
  }

  // Compute available pools
  const getAvailablePoolAddresses = useCallback(
    (mintAddress: string) => {
      if (!account.isAddress(mintAddress)) return []
      return Object.keys(pools).filter((poolAddress) => {
        const { mint_a, mint_b } = pools[poolAddress]
        return [mint_a, mint_b].includes(mintAddress)
      })
    },
    [pools],
  )

  const onSelectionInfo = async (mintAddress: string) => {
    const { splt } = window.stream
    const poolAddresses = getAvailablePoolAddresses(mintAddress)
    const decimals = await getDecimals(mintAddress)

    const selectionInfo: SelectionInfo = {
      mintInfo: {
        address: mintAddress,
        decimals,
      },
      poolAddresses,
    }

    dispatch(setLoadingStreamswap({ loadingStreamswap: true }))
    if (!account.isAddress(mintAddress))
      return dispatch(
        updateAskData({ amount: '', prioritized: true, ...selectionInfo }),
      )
    const accountAddress = await splt.deriveAssociatedAddress(
      walletAddress,
      mintAddress,
    )

    return dispatch(
      updateAskData({
        amount: '',
        prioritized: true,
        accountAddress,
        ...selectionInfo,
      }),
    )
  }

  const DARK_BOX_SHADOW = '0px 4px 44px rgba(0, 0, 0, 0.42)'
  const LIGHT_BOX_SHADOW = '0px 4px 40px rgba(33, 36, 51, 0.18)'

  const MINT_SELECTION_STYLE = {
    marginLeft: -7,
    padding: '3px 8px',
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: theme === 'dark' ? DARK_BOX_SHADOW : LIGHT_BOX_SHADOW,
  }

  return (
    <Row gutter={[0, 0]}>
      <Col flex="auto">
        <MintSelection
          value={mintInfo.address}
          onChange={onSelectionInfo}
          style={MINT_SELECTION_STYLE}
        />
      </Col>
      <Col>
        <NumericInput
          bordered={false}
          style={{
            textAlign: 'right',
            fontSize: 24,
            maxWidth: 150,
            padding: 0,
          }}
          placeholder="0"
          value={amount}
          onValue={onAmount}
        />
      </Col>
      <Col span={24}>
        <Space className="caption">
          <Typography.Text type="secondary">Available:</Typography.Text>
          <Typography.Text type="secondary">
            {numeric(maxBalance).format('0,0.[00]')}
          </Typography.Text>
          <Typography.Text type="secondary">
            <MintSymbol mintAddress={selectionInfo.mintInfo?.address || ''} />
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default Ask
