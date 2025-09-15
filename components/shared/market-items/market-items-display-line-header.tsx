import React from 'react';

export const MarketItemsDisplayLineHeader: React.FC = () => {
  return (
    <div className='flex items-center justify-between pb-3 2k:pb-4 4k:pb-6 8k:pb-12 pr-6 2k:pr-8 4k:pr-14 8k:pr-28 pl-6 2k:pl-8 4k:pl-12 8k:pl-24'>
        <p className='sm:mr-4 text-sm 2k:text-2xl 4k:text-4xl 8k:text-7xl lg:text-lg font-semibold'>Name</p>
        <div className='flex items-center space-x-2 2k:space-x-4 4k:space-x-8 8k:space-x-14 md:space-x-3 xl:space-x-4'>
            <div className='w-14 2k:w-19 4k:w-28 8k:w-56'><p className='text-right text-sm 2k:text-2xl 4k:text-4xl 8k:text-7xl lg:text-lg font-semibold'>Price</p></div>
            <div className='w-14 2k:w-19 4k:w-28 8k:w-56'><p className='text-right text-sm 2k:text-2xl 4k:text-4xl 8k:text-7xl lg:text-lg font-semibold'>Rating</p></div>
        </div>
    </div>
  )
}