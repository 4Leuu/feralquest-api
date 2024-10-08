import express from 'express';
import { config } from 'dotenv';
import { userRouter } from './routes/userRoutes';

config();

const app = express();
app.use(express.json());

app.use('/users', userRouter)

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`));