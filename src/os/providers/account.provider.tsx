import {
  createContext,
  useContext,
  Children,
  cloneElement,
  Component,
  forwardRef,
  ReactNode,
  useMemo,
} from 'react'

import { useRootSelector, RootState } from 'os/store'
import { AccountsState } from 'os/store/accounts.reducer'

const Context = createContext<AccountProvider>({} as AccountProvider)

export type AccountProvider = {
  accounts: AccountsState
}

/**
 * Account Context Provider
 */
const AccountContextProvider = ({ children }: { children: ReactNode }) => {
  const { accounts } = useRootSelector((state: RootState) => state)
  const provider = useMemo(() => ({ accounts }), [accounts])
  return <Context.Provider value={provider}>{children}</Context.Provider>
}
export default AccountContextProvider

/**
 * Account Context Consumer
 */
const AccountContextConsumer = ({ children }: { children: JSX.Element }) => {
  return (
    <Context.Consumer>
      {(value) =>
        Children.map(children, (child) => cloneElement(child, { ...value }))
      }
    </Context.Consumer>
  )
}

/**
 * Account HOC
 */
export const withAccount = (WrappedComponent: typeof Component) => {
  class HOC extends Component<any, any> {
    render() {
      const { forwardedRef, ...rest } = this.props
      return (
        <AccountContextConsumer>
          <WrappedComponent ref={forwardedRef} {...rest} />
        </AccountContextConsumer>
      )
    }
  }
  return forwardRef<HTMLElement, any>((props, ref) => (
    <HOC {...props} ref={ref} />
  ))
}

/**
 * Account Hook
 */
export const useAccount = () => {
  return useContext<AccountProvider>(Context)
}
