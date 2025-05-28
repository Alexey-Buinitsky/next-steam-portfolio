import {PopularMarketCases} from './popular-market-cases';

interface Props {
  className?: string;
}

export async function PopularMarket({ className }: Props) {
  return (
    <div className="bg-white dark:bg-transparent rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Most Popular CS:GO Items</h2>
      <PopularMarketCases />
    </div>
  );
}