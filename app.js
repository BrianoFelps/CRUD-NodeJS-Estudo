import express from 'express';
import cors from 'cors';
import products from './routes/products'

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", products);

export default app;