import { z } from "zod";
import { Types } from "mongoose";
import { BookModel } from "../book/book.model"; // Import BookModel to check product existence
import type { ObjectId } from "bson";

// Zod validation schema for the Order
export const orderValidationSchema = z.object({
  email: z.string().email("Invalid email format"), // Email validation
  product: z.custom<ObjectId>(),
  quantity: z
    .number()
    .min(1, { message: "Quantity must be greater than 0" }) // Ensure quantity is a positive integer
    .int("Quantity must be an integer"), // Ensure quantity is an integer
  totalPrice: z
    .number()
    .min(0, { message: "Total Price must be a positive number" }), // Ensure totalPrice is a positive number
});

export type OrderValidation = z.infer<typeof orderValidationSchema>;
