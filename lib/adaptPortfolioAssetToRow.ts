// import { PortfolioAssetWithData } from '@/types/portfolio';
// import { IRow } from '@/types/portfolio';
// import image from '@/public/images/no-image.jpg' // временное решение

// export const adaptPortfolioAssetToRow = (asset: PortfolioAssetWithData): IRow => ({
//   id: asset.asset.id.toString(),
//   icon: asset.asset.imageUrl
//   ? {
//       src: `https://steamcommunity-a.akamaihd.net/economy/image/${asset.asset.imageUrl}/`,
//       width: 40,
//       height: 40
//     }
//   : image,
//   name: asset.asset.name,
//   quantity: asset.quantity,
//   buyPrice: asset.buyPrice,
//   currentPrice: asset.asset.price || 0,
// });