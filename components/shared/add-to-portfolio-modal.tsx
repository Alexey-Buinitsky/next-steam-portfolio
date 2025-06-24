import React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@/services/api-instance';
import { Portfolio } from '@prisma/client';

interface Props {
    itemID: number
    itemName: string
    itemPrice: number
    onClose: () => void
    onAdd: () => void
    className?: string;
}

export const AddToPortfolioModal: React.FC<Props> = ({ itemID, itemName, itemPrice, onClose, onAdd, className }) => {
    const [selectedPortfolio, setSelectedPortfolio] = useState<number | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [buyPrice, setBuyPrice] = useState(itemPrice || 0)

    const {data: portfolios, isLoading, isError} = useQuery({
        queryKey: ['portfolios'],
        queryFn: async () => {
            const response = await apiInstance.get('/portfolio-modal')
            return response.data
        }
    })

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()

    //     if(!selectedPortfolio) return
        
    //     try {
    //         await apiInstance.post('/portfolio-assets')

    //     }
    // }

    return (
        <div className={className}>

        </div>
    );
};