import express, { Express, Request, Response } from "express"

const app: Express = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('FundChain Backend server');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});