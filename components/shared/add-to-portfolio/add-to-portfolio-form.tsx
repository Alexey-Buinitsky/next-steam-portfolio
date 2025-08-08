import React from 'react';
import Image from 'next/image';
import { Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { useAddToPortfolioForm } from '@/hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { AddToPortfolioFormData } from '@/hooks/use-form/use-add-to-portfolio-form';
import type { CreatePortfolioAssetProps } from '@/hooks/use-portfolios';
import type { Portfolio, Asset } from '@prisma/client';

interface Props {
    item: Asset
    onClose: () => void
    disableClose?: boolean;
    createPortfolioAsset: (params: CreatePortfolioAssetProps) => void
    portfolioList?: Portfolio[];
    handleCreateClick: () => void
}

export const AddToPortfolioForm: React.FC<Props> = ({ item, onClose, disableClose, createPortfolioAsset, portfolioList, handleCreateClick }) => {

    const form = useAddToPortfolioForm(
        item.price ? item.price / 100 : undefined,
        !!disableClose // true для статичной панели, false для модалки
    );

    const {handleSubmit, formState, control} = form

    const onSubmit = async (values: AddToPortfolioFormData) => {
        // отрабатывает только если все поля прошли проверку RHF через zod 
        try {
            createPortfolioAsset({ 
                portfolioId: Number(values.portfolioId), 
                selectedAsset: item, 
                quantity: values.quantity, 
                buyPrice: values.buyPrice 
            })

            onClose();

            toast.success('Item added to portfolio successfully!', {autoClose: 2000});
        } catch (error) {
            toast.error('Failed to add item to portfolio', {autoClose: 2000});
            console.error('Error adding item to portfolio:', error);
        }
    }   

    console.log(portfolioList!?.length);
    
    return (
        <div>
            <Image
                src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`} 
                alt={item.name || ''} 
                width={136}
                height={136}
                className="w-full h-32 object-contain mb-4"
                loading='lazy'
            />
            <h2 className="text-xl text-center font-bold mb-4">Add <span className='text-green-600 dark:text-green-400'>{item.name}</span> to Portfolio</h2>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {portfolioList!?.length > 0 ? (
                        <FormField 
                            control={control} // ← Передаём управление формой RHF вместо useState
                            name="portfolioId" // ← Ключ для доступа к значению (вместо имя переменной)
                            render={({ field }) => ( // ← Автоматически подставляет value/onChange
                                <FormItem>
                                    <FormLabel>Portfolio</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Portfolio" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="select-content">
                                            {portfolioList?.map(portfolio => (
                                                <SelectItem key={portfolio.id} value={portfolio.id.toString()}>
                                                    {portfolio.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                ) : (
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            No portfolios available
                        </p>
                        <Button 
                            onClick={handleCreateClick}
                            className='w-full'
                        >
                            Create Portfolio
                        </Button>
                    </div>
                )}

                    <div className="flex items-start gap-4">
                        <FormField
                            control={control}
                            name="buyPrice"
                            render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                                    <Input
                                        type="number"
                                        className="pl-8"
                                        {...field} // разворачивает value={field.value} и onChange={field.onChange} автоматически
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        min={0.01}
                                        step={0.01}
                                    />
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="quantity"
                            render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    min={1}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        {!disableClose && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={formState.isSubmitting || !portfolioList || portfolioList!?.length <= 0}
                        >
                            {formState.isSubmitting ? 'Adding...' : 'Add to Portfolio'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};