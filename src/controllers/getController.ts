import { Request, Response } from 'express';
import Product from '../models/Product';
import { Op } from 'sequelize';

export const getAllProducts = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const name = req.query.name as string;
    const category = req.query.category as string;

    const whereClause: any = {};

    if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
    }

    if (category) {
        whereClause.category = category;
    }

    try {
        const { rows: products, count: totalItems } = await Product.findAndCountAll({
            where: whereClause,
            limit,
            offset,
        });

        res.status(200).json({
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
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
};



export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'An error occurred while fetching the product.' });
    }
};
