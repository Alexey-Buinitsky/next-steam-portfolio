import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@/services/api-instance';
import { Portfolio } from '@prisma/client';
import { Button } from '../ui';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    itemId: number
    itemName: string
    itemPrice: number
    itemImageUrl: string
    onClose: () => void
    onAdd: () => void
    className?: string;
}

export const AddToPortfolioModal: React.FC<Props> = ({ itemId, itemName, itemPrice, itemImageUrl, onClose, onAdd, className }) => {
    const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [buyPrice, setBuyPrice] = useState(itemPrice || 0)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {data: portfolios, isLoading, isError} = useQuery<Portfolio[]>({
        queryKey: ['portfolios'],
        queryFn: async () => {
            const response = await apiInstance.get('/portfolios')
            return response.data
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedPortfolioId) return;
        
        setIsSubmitting(true);
        
        try {
            await apiInstance.post('/portfolio-assets', {
                portfolioId: selectedPortfolioId,
                assetId: itemId,
                quantity,
                buyPrice
            })

            onAdd();
            onClose();

            toast.success('Item added to portfolio successfully!', {autoClose: 2000});
        } catch (error) {
            toast.error('Failed to add item to portfolio', {autoClose: 2000});
            console.error('Error adding item to portfolio:', error);
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
            onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
        }, [onClose]);

        const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className={`${className} fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50`}
            onClick={handleBackdropClick}
        >
            <div 
                className='bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md'
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={`https://steamcommunity-a.akamaihd.net/economy/image/${itemImageUrl || ''}`} 
                    alt={itemName || ''} 
                    width={136}
                    height={136}
                    className="w-full h-34 object-contain mb-4"
                />
                <h2 className="text-xl text-center font-bold mb-4">Add <span className='text-green-600 dark:text-green-400'>{itemName}</span> to Portfolio</h2>

                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block mb-2'>Portfolio</label>
                        <select 
                            className='w-full p-2 border rounded dark:bg-gray-700'
                            value={selectedPortfolioId || ''}
                            onChange={(e) => setSelectedPortfolioId(Number(e.target.value))}
                            required
                            disabled={isSubmitting}
                        >
                            <option value=''>Select Portfolio</option>
                            {portfolios?.map((portfolio) => (
                                <option key={portfolio.id} value={portfolio.id}>
                                    {portfolio.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex items-center justify-between gap-4 mb-8'>
                        <div>
                            <label className='block mb-2'>Price</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-300">$</span>
                                </div>
                                <input
                                    className="w-full pl-6 p-2 border rounded dark:bg-gray-700"
                                    type="number" 
                                    value={buyPrice}
                                    onChange={(e) => setBuyPrice(Number(e.target.value))}
                                    min={0.01}
                                    step={0.01}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block mb-2'>Quantity</label>
                            <input 
                                className="w-full p-2 border rounded dark:bg-gray-700"
                                type="number" 
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min={1}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end gap-2'>
                        <Button 
                            onClick={onClose} 
                            variant={'outline'}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type='submit' 
                            className='bg-green-600 text-white hover:bg-green-400'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add to Portfolio'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};