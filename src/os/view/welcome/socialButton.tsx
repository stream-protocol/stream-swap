import { Button, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const SOCIAL_MEDIA = [
  {
    src: 'https://stream.protocol.medium.com',
    icon: 'logo-medium',
  },
  {
    src: 'https://t.me/stream-protocol',
    icon: 'logo-telegram',
  },
  {
    src: 'https://twitter.com/stream-protocol',
    icon: 'logo-twitter',
  },
]

const SocialButton = () => {
  return (
    <Space className="social-button" size={24}>
      {SOCIAL_MEDIA.map((item, i) => (
        <Button
          type="text"
          size="small"
          key={i}
          onClick={() => window.open(item.src, '_blank')}
          icon={<IonIcon name={item.icon} />}
        />
      ))}
    </Space>
  )
}
export default SocialButton
