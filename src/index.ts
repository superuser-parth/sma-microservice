import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { analyzePost, createPost, getPost } from './controllers/posts';

const app: Application = express();
const PORT: number = 3003;

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/v1/posts', createPost);
app.get('/api/v1/posts/:id/analysis', analyzePost);
app.get('/api/v1/posts/:id', getPost);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Social Media Analytics Microservice');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
