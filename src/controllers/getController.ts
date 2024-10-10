import { Request, Response } from 'express';
import Product from '../models/Product';

export const getAllProducts = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        const { rows: products, count: totalItems } = await Product.findAndCountAll({
            limit,
            offset,
        });

        return res.status(200).json({
            products,
            pagination: {
                currentPage: page,
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                itemsPerPage: limit,
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
};


export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'An error occurred while fetching the product.' });
    }
};
