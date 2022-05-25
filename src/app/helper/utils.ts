import { PriceImpact } from 'app/constant/swap'

export const priceImpactColor = (priceImpact: number) => {
  if (priceImpact < PriceImpact.goodSwap) return '#3c5890'
  if (priceImpact > PriceImpact.acceptableSwap) return '#3C5990'
  return '#0f1624'
}
