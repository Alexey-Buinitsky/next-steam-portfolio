import React from 'react';

export const MarketItemsDisplayLineHeader: React.FC = () => {
  return (
    <div className='flex items-center justify-between pb-3 pr-2 pl-6 2xl:pl-12 2xl:pr-10'>
        <p className='sm:mr-4 text-sm lg:text-lg font-semibold'>Name</p>
        <div className='flex items-center space-x-2 md:space-x-3 xl:space-x-4'>
            <div className='w-14'><p className='text-right text-sm lg:text-lg font-semibold'>Price</p></div>
            <div className='w-14'><p className='text-right text-sm lg:text-lg font-semibold'>Rating</p></div>
        </div>
    </div>
  )
}