import { Request, Response } from 'express';
import { sequelize } from '../config/database';
import Product from '../models/Product';

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({ error: 'Name, price, and category are required.' });
    }

    const transaction = await sequelize.transaction();

    try {
        const product = await Product.findByPk(id, { transaction });

        if (!product) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Product not found.' });
        }

        await product.update(
            {
                name,
                price,
                description: description !== undefined ? description : product.description,
                category,
            },
            { transaction }
        );

        await transaction.commit();

        return res.status(200).json({
            message: 'Product updated successfully!',
            product,
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'An error occurred while updating the product.' });
    }
};
