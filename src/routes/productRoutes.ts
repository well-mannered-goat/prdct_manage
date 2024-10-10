import { Router } from "express";
import { addProduct } from "../controllers/addController";
import { getAllProducts, getProductById } from "../controllers/getController";
import { updateProduct } from "../controllers/updateController";
import { deleteProduct } from "../controllers/deleteController";

const router=Router();

router.post('/', addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;