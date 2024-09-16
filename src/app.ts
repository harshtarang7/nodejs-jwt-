import express from 'express';
import connectDB from './config/db.config';


const app = express();

connectDB();

app.use(express.json());

export default app;

