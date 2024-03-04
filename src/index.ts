import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../environment/.env') });
import routes from './routes/routes';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';


const app = express();
const port = 3000;

// SETTINGS
app.use(cors());

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());


// ROUTES

app.use('/api', routes);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

app.on('error', (err: any) => {
  console.error('Error starting server:', err);
});
