import { z } from "zod";

const bookValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  price: z.number(),
  category: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Author is required"),
  quantity: z.number(),
  inStock: z.boolean().default(true),
});

export default bookValidationSchema;
