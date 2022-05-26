import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Ask from '../ask'
import Bid from '../bid'

import { AppDispatch, AppState } from 'app/model'
import { updateAskData } from 'app/model/ask.controller'
import { updateBidData } from 'app/model/bid.controller'
import { setLoadingStreamswap } from 'app/model/route.controller'

const SwapInput = ({ widget = false }: { widget?: boolean }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { bid: bidData, ask: askData } = useSelector((state: AppState) => state)

  /**
   * Switch tokens
   */
  const onSwitch = useCallback(async () => {
    const { amount: bidAmount, priority: bidPriority, ...bidRest } = bidData
    const { amount: askAmount, priority: askPriority, ...askRest } = askData
    const amount = bidPriority > askPriority ? bidAmount : askAmount
    const updateData = bidPriority > askPriority ? updateAskData : updateBidData
    await dispatch(setLoadingStreamswap({ loadingStreamswap: true }))
    await dispatch(updateBidData({ ...askRest, amount: '', reset: true }))
    await dispatch(updateAskData({ ...bidRest, amount: '', reset: true }))
    await dispatch(updateData({ amount, prioritized: true }))
  }, [dispatch, askData, bidData])

  const bidStyle = widget
    ? { padding: '16px 16px 40px' }
    : { padding: '6px 24px 16px' }
  const askStyle = widget
    ? { padding: '0 16px 16px' }
    : { padding: '0 24px 24px' }
  const wrapStype = widget ? { margin: '0 -12px' } : {}

  return (
    <Row gutter={[0, 0]} justify="center" style={{ ...wrapStype }}>
      <Col span={24} style={{ ...bidStyle }} className="swap-bid">
        <Bid />
      </Col>
      <Col style={{ top: -12 }}>
        <Button
          className="btn-switch-type"
          size="small"
          icon={<IonIcon name="git-compare-outline" />}
          onClick={onSwitch}
        />
      </Col>
      <Col span={24} style={{ ...askStyle }}>
        <Ask />
      </Col>
    </Row>
  )
}

export default SwapInput
