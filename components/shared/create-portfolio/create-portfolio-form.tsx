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
        onCreatePortfolio(values.name);
        form.reset();
        onClose();
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='mb-4 '>
                            <FormLabel>Portfolio Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter a name..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className='gap-2'>
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}