import React from 'react';
import Image from 'next/image';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { CustomSelect } from '../custom/custom-select';
import { useAddToPortfolioForm } from '@/hooks';

import type { AddToPortfolioFormValues} from '@/form';
import type { CreatePortfolioAssetProps } from '@/hooks/use-portfolios';
import type { Portfolio, Asset } from '@prisma/client';

interface Props {
    item: Asset;
    onClose: () => void;
    disableClose?: boolean;
    createPortfolioAsset: (params: CreatePortfolioAssetProps) => void;
    portfolioList?: Portfolio[];
    handleCreateClick: () => void;
}

export const AddToPortfolioForm: React.FC<Props> = ({ item, onClose, disableClose, createPortfolioAsset, portfolioList, handleCreateClick }) => {

    const form = useAddToPortfolioForm(
        item.price ? item.price / 100 : undefined,
        !!disableClose // true для статичной панели, false для модалки
    )

    const {handleSubmit, formState, control} = form

    const portfolioOptions = portfolioList?.map(portfolio => ({
        value: portfolio.id.toString(),
        label: portfolio.name
    })) || [];

    const onSubmit = async (values: AddToPortfolioFormValues) => {
        // отрабатывает только если все поля прошли проверку RHF через zod 
        try {
            createPortfolioAsset({ 
                portfolioId: Number(values.portfolioId), 
                selectedAsset: item, 
                quantity: Number(values.quantity), 
                buyPrice: Number(values.buyPrice) 
            })
            onClose()
        } catch (error) {
            console.error('Error adding item to portfolio:', error)
        }
    }   
    
    return (
        <div>
            <Image
                src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.imageUrl || ''}`} 
                alt={item.name || ''} 
                width={136}
                height={136}
                className="w-full h-32 2k:h-43 4k:h-64 8k:h-128 object-contain mb-4 2k:mb-5 4k:mb-8 8k:mb-16"
                loading='lazy'
            />
            <h3 className="text-xl 2k:text-2xl 4k:text-4xl 8k:text-7xl text-center font-bold mb-4 2k:mb-5 4k:mb-8 8k:mb-16 max-w-124 2k:max-w-165 4k:max-w-248 8k:max-w-496 min-h-14 2k:min-h-19 4k:min-h-28 8k:min-h-56 mx-auto">Add <span className='text-green-600 dark:text-green-400'>{item.name}</span> to Portfolio</h3>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 2k:space-y-5 4k:space-y-8 8k:space-y-16">

                    {portfolioList && portfolioList?.length > 0 ? (
                        <FormField 
                            control={control}
                            name="portfolioId"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel className="text-sm 2k:text-lg 4k:text-2xl 8k:text-6xl 2k:mb-1 4k:mb-2 8k:mb-6">Portfolio</FormLabel>
                                    <FormControl>
                                        <CustomSelect
                                            value={field.value || ''}
                                            onValueChange={field.onChange}
                                            options={portfolioOptions}
                                            placeholder="Select Portfolio"
                                            className={fieldState.error ? "border-destructive" : ""}
                                        />
                                    </FormControl>
                                    {fieldState.error && (
                                        <FormMessage className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl">{fieldState.error.message}</FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                    ) : (
                        <div className="space-y-2 2k:space-y-3 4k:space-y-4 8k:space-y-8">
                            <p className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl text-muted-foreground">
                                No portfolios available
                            </p>
                            <Button 
                                onClick={handleCreateClick}
                                className='w-full text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36'
                            >
                                Create Portfolio
                            </Button>
                        </div>
                    )}

                    <div className="flex items-start gap-4 2k:gap-5 4k:gap-8 8k:gap-16">
                        <FormField
                            control={control}
                            name="buyPrice"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-base 2k:text-xl 4k:text-3xl 8k:text-6xl 2k:mb-1 4k:mb-2 8k:mb-6">Buy price</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-10 2k:h-13 4k:h-20 8k:h-40"
                                                {...field}
                                                min={0.01}
                                                step={0.01}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-base 2k:text-xl 4k:text-3xl 8k:text-6xl 2k:mb-1 4k:mb-2 8k:mb-6">Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-10 2k:h-13 4k:h-20 8k:h-40"
                                            {...field}
                                            min={1}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-2 2k:gap-3 4k:gap-4 8k:gap-8 pt-2 2k:pt-3 4k:pt-4 8k:pt-8">
                        {!disableClose && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36 px-4 2k:px-5 4k:px-8 8k:px-16"
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36 px-4 2k:px-5 4k:px-8 8k:px-16"
                            disabled={formState.isSubmitting || !portfolioList || portfolioList?.length <= 0}
                        >
                            {formState.isSubmitting ? 'Adding...' : 'Add to Portfolio'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}