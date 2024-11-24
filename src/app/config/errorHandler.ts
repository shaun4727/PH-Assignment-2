import { Issue } from '../../modules/book/book.interface';

export const ErrorHandler = (err: any) => {
    if (err.issues) {
        const titles = err.issues?.map((item: Issue) => `${item.path.toString()} ${item.message}`);

        return { statusCode: 400, message: `${titles.toString()}` }; // Bad Request
        // return { statusCode: 400, message: err.issues[0].message }; // Bad Request
    }

    if (err.name === 'CastError') {
        return { statusCode: 400, message: `Invalid ${err.path}: ${err.value}` }; // Bad Request
    }

    if (err.name === 'NotFound') {
        return { statusCode: 404, message: err.message };
    }

    if (err.code === 11000) {
        return { statusCode: 409, message: 'Duplicate key error' }; // Conflict
    }

    if (err.errors.product) {
        return { statusCode: 400, message: err.message };
    }

    return { statusCode: 500, message: 'Internal Server Error' }; // Default
};

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        console.log('errr');
        this.name = 'NotFound';
    }
}
