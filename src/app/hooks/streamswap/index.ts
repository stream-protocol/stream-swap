import { useHandleSwap } from './useHandleSwap'
import { useBestRoute } from './useBestRoute'

const useStreamswap = (fixedPoolAddress?: string) => {
  const bestRoute = useBestRoute(fixedPoolAddress)
  const swap = useHandleSwap()

  return { bestRoute, swap }
}

export default useStreamswap
