import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { account } from '@stream-protocol/swap-js'

import { Row, Col, Card } from 'antd'
import WelcomeSlide from './welcomeSlide'
import SocialButton from './socialButton'
import WalletConnection from 'os/view/wallet/login/walletConnection'

import { useRootSelector, RootState } from 'os/store'
import './index.os.less'

const Welcome = () => {
  const history = useHistory()
  const { search } = useLocation()
  const {
    wallet: { address: walletAddress },
    ui: { width },
    page: { appIds },
    flags: { loading },
  } = useRootSelector((state: RootState) => state)

  // Redirect callback
  useEffect(() => {
    const params = new URLSearchParams(search)
    const fallback = appIds.length ? `/app/${appIds[0]}` : '/store'
    const redirect = decodeURIComponent(params.get('redirect') || fallback)
    if (account.isAddress(walletAddress) && !loading) history.push(redirect)
  }, [walletAddress, history, search, appIds, loading])

  return (
    <Row gutter={[24, 24]} justify="center" className="welcome">
      <Col xs={24} lg={12} className="welcome-slide">
        <WelcomeSlide />
        <SocialButton />
      </Col>
      {width >= 992 && (
        <Col xs={24} lg={12} className="welcome-wallet-connection">
          <Card
            className="card-wallet-connection"
            bordered={false}
            hoverable={false}
          >
            <WalletConnection />
          </Card>
        </Col>
      )}
    </Row>
  )
}

export default Welcome
