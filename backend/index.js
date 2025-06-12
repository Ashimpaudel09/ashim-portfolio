import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import skillRoutes from './routes/skills.js';
import projectRoutes from './routes/projects.js'
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
