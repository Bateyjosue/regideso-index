import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import ratelimit from 'express-rate-limit';

const app: Express = express();

app.use(helmet());
app.use(morgan('dev'));

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

// routes
app.get('/', (req, res) => {
  res.send({ message: 'API is running' });
});

export default app;
