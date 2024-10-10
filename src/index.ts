import express, { Express, Request, Response } from "express"
import { testConnection } from "./config/database";
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes"
import Product from "./models/Product";
dotenv.config()

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());

testConnection();

Product.sync({ force: false })
    .then(() => {
        console.log('Product table created successfully.');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });

app.get('/', (req: Request, res: Response) => {
    res.send('Product Management server');
});

app.use('/products', productRoutes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});