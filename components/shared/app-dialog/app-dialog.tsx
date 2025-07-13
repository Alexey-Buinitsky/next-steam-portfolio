"use client"

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DialogContent, } from '@/components/ui';
import { AppDialogHeader, AppDialogForm, AppDialogFooter } from '@/components/shared/app-dialog';
import { portfolioSchema, portfolioAssetSchema } from '@/form/form-schemas';
import { portfolioFields, portfolioAssetFields } from '@/form/form-fields';
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { Asset, Portfolio } from '@prisma/client';
import { PortfolioAssetWithRelations } from '@/types/portfolio';
import { toast } from "sonner"

interface CommonProps {
	className?: string;
	mode: "createPortfolio" | "editPortfolio" | "createPortfolioAsset" | "editPortfolioAsset" | "deletePortfolioAssets";
	selectedPortfolio?: Portfolio;
	selectedAsset?: Asset | null;
	selectedPortfolioAsset?: PortfolioAssetWithRelations | null;
	selectedPortfolioAssets?: PortfolioAssetWithRelations[] | null;
	onCancel: () => void;
	onDelete?: () => void;
}

type PortfolioModeProps = CommonProps & {
	mode: "createPortfolio" | "editPortfolio";
	onSubmit: (data: string) => void;
}

type PortfolioAssetModeProps = CommonProps & {
	mode: "createPortfolioAsset" | "editPortfolioAsset";
	onSubmit: (data: { quantity: number; buyPrice: number }) => void;
}

type DeletePortfolioAssetsModeProps = CommonProps & {
	mode: "deletePortfolioAssets";
	onSubmit: () => void;
}

type Props = PortfolioModeProps | PortfolioAssetModeProps | DeletePortfolioAssetsModeProps

export const AppDialog: React.FC<Props> = ({ className, mode, selectedPortfolio, selectedAsset, selectedPortfolioAsset, selectedPortfolioAssets, onCancel, onSubmit, onDelete }) => {

	const portfolioMethods = useForm<z.infer<typeof portfolioSchema>>({
		resolver: zodResolver(portfolioSchema),
		defaultValues: { portfolioName: mode === "editPortfolio" ? selectedPortfolio?.name : "", },
	})

	const portfolioAssetMethods = useForm<z.infer<typeof portfolioAssetSchema>>({
		resolver: zodResolver(portfolioAssetSchema),
		defaultValues:
			mode === "editPortfolioAsset" && selectedPortfolioAsset
				? { quantity: selectedPortfolioAsset.quantity.toString(), buyPrice: selectedPortfolioAsset.buyPrice.toString() }
				: { quantity: "", buyPrice: "" },
	})

	const handlePortfolioSubmit = (values: z.infer<typeof portfolioSchema>) => {
		(onSubmit as (data: string) => void)(values.portfolioName)
		if (mode === "createPortfolio") { portfolioMethods.reset({ portfolioName: "" }) }
	}

	const handlePortfolioAssetSubmit = (values: z.infer<typeof portfolioAssetSchema>) => {
		(onSubmit as (data: { quantity: number; buyPrice: number }) => void)({ quantity: Number(values.quantity), buyPrice: Number(values.buyPrice) })
		if (mode === "createPortfolioAsset") { portfolioAssetMethods.reset({ quantity: "", buyPrice: "" }) }
	}

	const handleCancel = () => {
		onCancel()
		if (mode === "createPortfolio") { portfolioMethods.reset({ portfolioName: "" }) }
		if (mode === "editPortfolio") { portfolioMethods.reset({ portfolioName: selectedPortfolio?.name || "" }) }
		if (mode === "createPortfolioAsset") { portfolioAssetMethods.reset({ quantity: "", buyPrice: "" }) }
		if (mode === "createPortfolioAsset" || mode === "editPortfolioAsset") {
			portfolioAssetMethods.reset({
				quantity: mode === "editPortfolioAsset" && selectedPortfolioAsset ? selectedPortfolioAsset.quantity.toString() : "",
				buyPrice: mode === "editPortfolioAsset" && selectedPortfolioAsset ? selectedPortfolioAsset.buyPrice.toString() : ""
			})
		}
	}

	React.useEffect(() => {
		if (mode === "editPortfolio") {
			portfolioMethods.reset({ portfolioName: selectedPortfolio?.name || "" })
		} else if (mode === "createPortfolio") {
			portfolioMethods.reset({ portfolioName: "" })
		} else if (mode === "editPortfolioAsset" && selectedPortfolioAsset) {
			portfolioAssetMethods.reset({ quantity: selectedPortfolioAsset.quantity.toString(), buyPrice: selectedPortfolioAsset.buyPrice.toString() })
		}
	}, [mode, selectedPortfolio, selectedPortfolioAsset, portfolioMethods, portfolioAssetMethods])

	return (
		<DialogContent className={cn("", className)}>
			<AppDialogHeader mode={mode} selectedPortfolioAssets={selectedPortfolioAssets} />

			{(mode === "createPortfolio" || mode === "editPortfolio") &&
				<FormProvider {...portfolioMethods}>
					<AppDialogForm id={mode === "createPortfolio" ? "createPortfolio" : "editPortfolio"} fields={portfolioFields} onSubmit={handlePortfolioSubmit} />
				</FormProvider>
			}

			{mode === "createPortfolioAsset" && selectedAsset
				? <div className="flex flex-col gap-3 2k:gap-4 4k:gap-6 8k:gap-12">
					<div className="flex items-center justify-center gap-2">
						<Image alt={selectedAsset.name} src={`https://steamcommunity-a.akamaihd.net/economy/image/${selectedAsset.imageUrl || ""}`} priority={true} width={48} height={48} className="2k:size-13 4k:size-20 8k:size-40" />
						<h3 className="text-lg font-medium">{selectedAsset.name}</h3>
					</div>
					<FormProvider {...portfolioAssetMethods}>
						<AppDialogForm id="createPortfolioAsset" fields={portfolioAssetFields} onSubmit={handlePortfolioAssetSubmit} />
					</FormProvider>
				</div>
				: mode === "editPortfolioAsset" && selectedPortfolioAsset
					? <div className="flex flex-col gap-3 2k:gap-4 4k:gap-6 8k:gap-12">
						<div className="flex items-center justify-center gap-2">
							<Image alt={selectedPortfolioAsset.asset.name} src={`https://steamcommunity-a.akamaihd.net/economy/image/${selectedPortfolioAsset.asset.imageUrl || ""}`} priority={true} width={48} height={48} className="2k:size-13 4k:size-20 8k:size-40" />
							<h3 className="text-lg font-medium">{selectedPortfolioAsset.asset.name}</h3>
						</div>
						<FormProvider {...portfolioAssetMethods}>
							<AppDialogForm id="editPortfolioAsset" fields={portfolioAssetFields} onSubmit={handlePortfolioAssetSubmit} />
						</FormProvider>
					</div>
					: null
			}

			<AppDialogFooter mode={mode} onCancel={handleCancel} onDelete={onDelete} onSubmit={mode === "deletePortfolioAssets" ? (onSubmit as () => void) : undefined} />
		</DialogContent >
	)
}