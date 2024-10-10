import { Request, Response } from "express";
import Product from "../models/Product";

export const addProduct= async (req: Request, res: Response) => {
    try {
        const { name, price, description, category } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ error: 'Name, price, and category are required.' });
        }

        const newProduct = await Product.create({
            name,
            price,
            description,
            category,
        });

        return res.status(201).json({
            message: 'Product created successfully!',
            product: newProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ error: 'An error occurred while adding the product.' });
    }
}