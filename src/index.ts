import express, { Express, Request, Response } from "express"
import { testConnection } from "./config/database";
import dotenv from "dotenv"
dotenv.config()

const app: Express = express();
const port = process.env.PORT || 8000;

testConnection();

app.get('/', (req: Request, res: Response) => {
    res.send('FundChain Backend server');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});