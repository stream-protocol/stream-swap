import { account } from '@stream-protocol/swap-js'

import { Row, Col } from 'antd'
import Navigation from './navigation'

import { useRootSelector, RootState } from 'os/store'

const ContextMenu = () => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)

  if (!account.isAddress(walletAddress)) return null
  return (
    <Row gutter={[12, 12]} wrap={false}>
      <Col
        span={24}
        style={{ width: 0, marginLeft: 8 }}
        className="scrollbar"
        flex="auto"
      >
        <Navigation />
      </Col>
    </Row>
  )
}

export default ContextMenu
