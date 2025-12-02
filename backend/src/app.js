import express, {} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
// routes
app.get('/', (req, res) => {
    res.send('API is running');
});
export default app;
//# sourceMappingURL=app.js.map