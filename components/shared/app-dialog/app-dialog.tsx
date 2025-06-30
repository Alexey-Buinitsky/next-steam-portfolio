"use client"

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DialogContent, } from '@/components/ui';
import { AppDialogHeader, AppDialogForm, AppDialogFooter } from './index';
import { assetSchema, portfolioSchema } from '@/form/form-schemas';
import { assetFields, portfolioFields } from '@/form/form-fields';
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { Asset, Portfolio } from '@prisma/client';
import { toast } from "sonner"

interface Props {
	className?: string;
	mode: "createPortfolio" | "editPortfolio" | "addAsset";
	selectedPortfolio?: Portfolio;
	selectedAsset?: Asset | null;
	onCancel: () => void;
	onSubmit: (data: string | { quantity: number; buyPrice: number }) => void;
	onDelete?: () => void;
}

export const AppDialog: React.FC<Props> = ({ className, mode, selectedPortfolio, selectedAsset, onCancel, onSubmit, onDelete }) => {

	const portfolioMethods = useForm<z.infer<typeof portfolioSchema>>({
		resolver: zodResolver(portfolioSchema),
		defaultValues: { portfolioName: mode === "editPortfolio" ? selectedPortfolio?.name : "", },
		mode: "onChange",
		reValidateMode: "onChange",
	})

	const assetMethods = useForm<z.infer<typeof assetSchema>>({
		resolver: zodResolver(assetSchema),
		defaultValues: { quantity: "", buyPrice: "" },
		mode: "onChange",
		reValidateMode: "onChange",
	})

	const handlePortfolioSubmit = (values: z.infer<typeof portfolioSchema>) => {
		onSubmit(values.portfolioName)
		if (mode === "createPortfolio") { portfolioMethods.reset({ portfolioName: "" }) }
	}

	const handleAssetSubmit = (values: z.infer<typeof assetSchema>) => {
		onSubmit({ quantity: Number(values.quantity), buyPrice: Number(values.buyPrice) })
		assetMethods.reset({ quantity: "", buyPrice: "" })
	}

	const handleCancel = () => {
		onCancel()
		if (mode === "createPortfolio") { portfolioMethods.reset({ portfolioName: "" }) }
		if (mode === "editPortfolio") { portfolioMethods.reset({ portfolioName: selectedPortfolio?.name || "" }) }
		if (mode === "addAsset") { assetMethods.reset({ quantity: "", buyPrice: "" }) }
	}

	React.useEffect(() => {
		if (mode === "editPortfolio") {
			portfolioMethods.reset({ portfolioName: selectedPortfolio?.name || "" })
		} else if (mode === "createPortfolio") { portfolioMethods.reset({ portfolioName: "" }) }
	}, [mode, selectedPortfolio, portfolioMethods])

	return (
		<DialogContent className={cn("", className)}>
			<AppDialogHeader mode={mode} />

			{selectedAsset && mode === "addAsset" &&
				<div className="">
					<div className="flex items-center justify-center gap-2">
						<Image alt={selectedAsset.name} src={`https://steamcommunity-a.akamaihd.net/economy/image/${selectedAsset.imageUrl || ""}`} priority={true} width={48} height={48} />
						{selectedAsset.name}
					</div>
					<FormProvider {...assetMethods}>
						<AppDialogForm id="addAsset" fields={assetFields} onSubmit={handleAssetSubmit} />
					</FormProvider>
				</div>
			}

			{mode !== "addAsset" &&
				<FormProvider {...portfolioMethods}>
					<AppDialogForm id={mode === "createPortfolio" ? "createPortfolio" : "editPortfolio"} fields={portfolioFields} onSubmit={handlePortfolioSubmit} />
				</FormProvider>
			}

			<AppDialogFooter mode={mode} onCancel={handleCancel} onDelete={onDelete} />
		</DialogContent>
	)
}