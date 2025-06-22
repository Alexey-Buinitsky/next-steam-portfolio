// 'use client';
// import { useItemHistory } from '@/hooks/use-item-history';
// import Link from 'next/link';
// import { use } from 'react';

// export default function ItemPage({ params }: { params: Promise<{ itemName: string }> }) {
//   // Правильное разворачивание Promise с помощью use()
//   const { itemName } = use(params);
//   const decodedItemName = decodeURIComponent(itemName);
//   const { data: itemHistory, isLoading, error } = useItemHistory(decodedItemName);

//   if (isLoading) {
//     return <div className="p-4">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="p-4 text-red-500">
//         Error loading data: {error.message}
//       </div>
//     );
//   }

//   if (!itemHistory) {
//     return <div className="p-4">No data available</div>;
//   }

//   const lastPrice = itemHistory.price[itemHistory.price.length - 1];
//   const lastVolume = itemHistory.volume[itemHistory.volume.length - 1];
//   const lastDate = itemHistory.time[itemHistory.time.length - 1];

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">{decodedItemName}</h1>
      
//       <div className="mb-6">
//         <div className="mb-2">
//           <span className="font-semibold">Last Price:</span> ${lastPrice}
//         </div>
//         <div className="mb-2">
//           <span className="font-semibold">Last Volume:</span> {lastVolume}
//         </div>
//         <div>
//           <span className="font-semibold">Last Update:</span> {new Date(lastDate).toLocaleDateString()}
//         </div>
//       </div>

//       <Link href="/market" className="text-blue-500 hover:underline">
//         ← Back to Market
//       </Link>
//     </div>
//   );
// }