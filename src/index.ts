import express from 'express';
import { Request, Response } from 'express';
const app = express();
import imgRouter from './routes/imgRoutes';

// routes
app.get('/api', (req: Request, res: Response): Response => {
    return res.send('Hello');
});

app.use('/api/images', imgRouter);

const port = 3000;
app.listen(port, () => console.log('server on ' + port));

export default app;
