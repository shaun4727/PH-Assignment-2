import { z } from 'zod';

// import type { ObjectId } from 'bson';
import { Types } from 'mongoose';

// validate object id

const iSValidObjectId = (objectId: unknown): boolean => {
    const objIdString = String(objectId);
    if (objIdString.length !== 24) {
        return false;
    }
    if (Types.ObjectId.isValid(objIdString)) {
        return true;
    }
    return false;
};

// Zod validation schema for the Order
export const orderValidationSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required'
        })
        .email('Invalid email format'), // Email validation
    product: z.custom<Types.ObjectId>((val) => iSValidObjectId(val), {
        message: 'Not a valid ObjectId'
    }),
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

export type OrderValidation = z.infer<typeof orderValidationSchema>;
