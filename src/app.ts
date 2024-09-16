import express from 'express';
import connectDB from './config/db.config';
import route from './routes/auth.routes';



const app = express();

connectDB();

app.use(express.json());

app.use('/auth/',route)

export default app;

