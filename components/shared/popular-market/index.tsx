import {PopularMarketCases} from './popular-market-cases';

interface Props {
  className?: string;
}

export async function PopularMarket({ className }: Props) {
  return (
    <div className="rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">The most popular investment cases</h2>
      <PopularMarketCases />
    </div>
  );
}