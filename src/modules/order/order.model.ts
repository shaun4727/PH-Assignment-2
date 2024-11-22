import { Schema, model, Types } from "mongoose";
import { Order } from "./order.interface";
import { BookModel } from "../book/book.model";

const orderSchema = new Schema<Order>(
  {
    email: { type: String, required: [true, "Email is required"] },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Product is required"],
    },
    quantity: { type: Number, required: [true, "Quantity is required"] },
    totalPrice: { type: Number, required: [true, "Total Price  is required"] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const OrderModel = model<Order>("Order", orderSchema);
