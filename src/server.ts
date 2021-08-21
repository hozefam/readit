import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import subRoutes from './routes/subs';
import trim from './middleware/trim';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config({ path: __dirname + '/.env' });

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());

app.get('/', (_, res) => res.send('Hello World'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subs', subRoutes);

app.listen(process.env.PORT || 5000, async () => {
  console.log(`Server runnning at http:\\localhost:${process.env.PORT}`);

  try {
    await createConnection();
    console.log('Database Connected');
  } catch {
    console.log('Error Connecting to Database');
  }
});
