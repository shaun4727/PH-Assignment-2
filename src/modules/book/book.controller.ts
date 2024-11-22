import { Request, Response } from "express";
import { BookServices } from "./book.service";
import bookValidationSchema from "./book.zod.validation";
import { ErrorHandler, NotFoundError } from "../../app/config/errorHandler";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const parsedData = bookValidationSchema.parse(book);

    const result = await BookServices.createBookIntoDB(parsedData);

    res.status(200).json({
      success: true,
      message: "Book is created successfully",
      data: result,
    });
  } catch (err: any) {
    const { statusCode, message } = ErrorHandler(err);
    res.status(statusCode).json({
      success: false,
      message: message,
      error: err,
      stack: err.stack,
    });
  }
};

const getBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.getAllBookFromDB();

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    const { statusCode, message } = ErrorHandler(err);
    res.status(statusCode).json({
      success: false,
      message: message,
      error: err,
      stack: err.stack,
    });
  }
};

const getSingleBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BookServices.getOneBookFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    const { statusCode, message } = ErrorHandler(err);
    res.status(statusCode).json({
      success: false,
      message: message,
      error: err,
      stack: err.stack,
    });
  }
};

const updateSingleBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const book = req.body;
    const result = await BookServices.updateOneBookFromDB(productId, book);

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (err: any) {
    const { statusCode, message } = ErrorHandler(err);
    res.status(statusCode).json({
      success: false,
      message: message,
      error: err,
      stack: err.stack,
    });
  }
};

const deleteSingleBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BookServices.deleteOneBook(productId);

    // if result.deletedCount is 0, book is not deleted

    if (!result.deletedCount) {
      throw new NotFoundError("Book not found");
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: {},
    });
  } catch (err: any) {
    const { statusCode, message } = ErrorHandler(err);
    res.status(statusCode).json({
      success: false,
      message: message,
      error: err,
      stack: err.stack,
    });
  }
};

export const BookControllers = {
  createBook,
  getBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
