export const calculateFee = (amount: number, divisor: number): number => {
  let fee = amount / divisor
  fee = Math.round(fee * 1000) / 1000
  fee = Math.floor(fee * 100) / 100
  return fee < 0.01 && fee > 0 ? 0.01 : fee
}