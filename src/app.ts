import express from 'express';
import connectDB from './config/db.config';
import route from './routes/auth.routes';
import { errorHandler, notFound } from './middleware/error.middleware';



const app = express();

connectDB();

app.use(express.json());

app.use('/api/',route);

app.use(notFound);
app.use(errorHandler)

export default app;

