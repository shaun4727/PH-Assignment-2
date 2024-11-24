import { z } from 'zod';

import { Types } from 'mongoose';
import { BookModel } from '../book/book.model';

// Zod validation schema for the Order
export const orderValidationSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required'
        })
        .email('Invalid email format'), // Email validation
    product: z.custom<Types.ObjectId>().refine(
        async (val) => {
            const bookId = await BookModel.findById(val).exec();

            return !!bookId;
        },
        {
            message: 'Book ID does not exist'
        }
    ),
    quantity: z
        .number({
            required_error: 'Quantity is required'
        })
        .min(1, { message: 'Quantity must be greater than 0' }) // Ensure quantity is a positive integer
        .int('Quantity must be an integer'), // Ensure quantity is an integer
    totalPrice: z
        .number({
            required_error: 'Total Price is required'
        })
        .min(0, { message: 'Total Price must be a positive number' }) // Ensure totalPrice is a positive number
});
