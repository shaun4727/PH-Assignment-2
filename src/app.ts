import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/book/book.route';
import { OrderRoutes } from './modules/order/order.route';

const app: Application = express();

app.use(express.json()); // to parse json data
app.use(cors());

app.use('/api/products', BookRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
    res.end('Project running');
});

export default app;
