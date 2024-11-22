import { OrderModel } from "./order.model";
import { Order } from "./order.interface";
import { BookModel } from "../book/book.model";

const orderBookFromDB = async (order: Order) => {
  const result = await OrderModel.create(order); // static method create
  const book = await BookModel.findOne({ _id: result.product });

  if (!book) {
    return 1;
  }

  if (Number(book.quantity) < Number(result.quantity)) {
    return 2;
  }

  book.quantity = Number(book.quantity) - Number(result.quantity);
  if (book.quantity === 0) {
    book.inStock = false; // Mark as out of stock if the quantity reaches 0
  }

  await BookModel.updateOne({ _id: result.product }, book);

  return result;
};

const totalRevenue = async () => {
  const result = await OrderModel.aggregate([
    {
      $lookup: {
        from: "books", // The collection name for the books model
        localField: "product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails", // Flatten the array from $lookup
    },
    {
      $group: {
        _id: null, // Group all orders together
        totalRevenue: {
          $sum: { $multiply: ["$quantity", "$productDetails.price"] }, // Calculate revenue per order
        },
      },
    },
  ]);

  return result;
};

export const OrderServices = {
  orderBookFromDB,
  totalRevenue,
};
