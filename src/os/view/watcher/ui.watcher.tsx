import { Fragment, useEffect } from 'react'

import { notification } from 'antd'

import { useRootDispatch, RootDispatch } from 'os/store'
import { resize } from 'os/store/ui.reducer'
import IonIcon from 'shared/antd/ionicon'

const UIWatcher = () => {
  const [api, contextHolder] = notification.ustreamotification()
  const dispatch = useRootDispatch<RootDispatch>()

  // Notification system
  window.notify = ({
    type,
    description,
    onClick = () => {},
  }: streamNotification) => {
    return api[type]({
      message: type.toUpperCase(),
      description,
      onClick,
      style: { cursor: 'pointer' },
      closeIcon: <IonIcon name="close-outline" />,
    })
  }

  // Listen window events
  useEffect(() => {
    window.onresize = () => dispatch(resize())
  }, [dispatch])

  return <Fragment>{contextHolder}</Fragment>
}

export default UIWatcher
