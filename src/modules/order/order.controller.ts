import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { orderValidationSchema } from './order.zod.validation';
import { ErrorHandler, NotFoundError } from '../../app/config/errorHandler';

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body;
        const parsedData = orderValidationSchema.parse(order);

        const result = await OrderServices.orderBookFromDB(parsedData);

        if (result == 1) {
            throw new NotFoundError('Book not found');
        }

        if (result == 2) {
            throw new NotFoundError('This quantity is not available in Stock');
        }

        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result
        });
    } catch (err: any) {
        const { statusCode, message } = ErrorHandler(err);
        res.status(statusCode).json({
            success: false,
            message: message,
            error: err,
            stack: err.stack
        });
    }
};

const totalRevenues = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.totalRevenue();

        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: {
                totalRevenue: result[0]?.totalRevenue
            }
        });
    } catch (err: any) {
        const { statusCode, message } = ErrorHandler(err);
        res.status(statusCode).json({
            success: false,
            message: message,
            error: err,
            stack: err.stack
        });
    }
};

const checkingJson = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.checkJson();

        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: result
        });
    } catch (err: any) {
        const { statusCode, message } = ErrorHandler(err);
        res.status(statusCode).json({
            success: false,
            message: message,
            error: err,
            stack: err.stack
        });
    }
};

export const orderControllers = {
    createOrder,
    totalRevenues,
    checkingJson
};
