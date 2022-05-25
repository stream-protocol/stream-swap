import { Avatar, Space, Tooltip, Typography } from 'antd'
import streamIcon from 'app/static/images/stream.svg'

export type PoweredBystreamProps = {
  title?: string
  spacing?: number
  iconSize?: number
}

const PoweredBystream = ({
  title = 'Powered by',
  spacing = 4,
  iconSize = 20,
}: PoweredBystreamProps) => {
  return (
    <Space size={spacing} style={{ cursor: 'pointer' }}>
      <Typography.Text style={{ fontSize: 12, color: '#7A7B85' }}>
        {title}
      </Typography.Text>
      <Tooltip title="stream Protocol">
        <Avatar src={streamIcon} size={iconSize} />
      </Tooltip>
    </Space>
  )
}

export default PoweredByStreamProtocol
