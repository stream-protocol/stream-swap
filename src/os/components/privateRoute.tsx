import { ComponentProps, ElementType, useCallback } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { account } from '@stream-protocol/swap-js'

import { useRootSelector, RootState } from 'os/store'

export type PrivateRouteProps = {
  component: ElementType
} & ComponentProps<typeof Route>

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { address: walletAddress } = useRootSelector(
    (state: RootState) => state.wallet,
  )

  const render = useCallback(
    (props) => {
      const pathname = encodeURIComponent(
        window.location.href.replace(window.location.origin, ''),
      )
      if (!account.isAddress(walletAddress))
        return <Redirect to={'/welcome?redirect=' + pathname} />
      return <Component {...props} />
    },
    [walletAddress, Component],
  )

  return <Route {...rest} render={render} />
}

export default PrivateRoute
