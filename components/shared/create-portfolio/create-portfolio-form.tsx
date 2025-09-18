'use client'
import { DialogFooter, Form, FormField, FormItem, FormControl, FormLabel, FormMessage, Input, Button } from '@/components/ui'
import { useCreatePortfolioForm } from '@/hooks'

interface Props {
    onClose: () => void;
    onCreatePortfolio: (name: string) => void
}

export const CreatePortfolioForm:React.FC<Props> = ({ onClose, onCreatePortfolio }) => {
    const { form } = useCreatePortfolioForm()

    const handleSubmit = (values: { name: string }) => {
        onCreatePortfolio(values.name)
        form.reset()
        onClose()
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='mb-4 2k:mb-5 4k:mb-8 8k:mb-16'>
                            <FormLabel>Portfolio Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter a name..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className='gap-2 2k:gap-3 4k:gap-4 8k:gap-8'>
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onClose}
                        className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36 px-4 2k:px-5 4k:px-8 8k:px-16"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        className="text-sm 2k:text-lg 4k:text-3xl 8k:text-6xl h-9 2k:h-12 4k:h-18 8k:h-36 px-4 2k:px-5 4k:px-8 8k:px-16"
                    >
                        Create
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}