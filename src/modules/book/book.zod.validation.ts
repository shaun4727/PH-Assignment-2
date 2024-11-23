import { z } from 'zod';

const bookValidationSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    author: z.string({
        required_error: 'Author is required'
    }),
    price: z.number({
        required_error: 'Price is required'
    }),
    category: z.string({
        required_error: 'Category is required'
    }),
    description: z.string({
        required_error: 'Description is required'
    }),
    quantity: z.number({
        required_error: 'Quantity is required'
    }),
    inStock: z
        .boolean({
            required_error: 'Stock is required'
        })
        .default(true)
});

export default bookValidationSchema;
