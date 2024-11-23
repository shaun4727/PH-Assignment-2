export type Book = {
    title: string;
    author: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
};

export type Issue = {
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
};
