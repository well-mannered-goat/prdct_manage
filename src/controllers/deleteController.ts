import { Request, Response } from 'express';
import { sequelize } from '../config/database';
import Product from '../models/Product';

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const transaction = await sequelize.transaction();

  try {
    const product = await Product.findByPk(id, { transaction });

    if (!product) {
      await transaction.rollback();
      res.status(404).json({ error: 'Product not found.' });
    }
    
    await product!.destroy({ transaction });

    await transaction.commit();

    res.status(200).json({
      message: 'Product deleted successfully!',
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
};
