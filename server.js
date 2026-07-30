import 'dotenv/config'; 
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dbPool from './config/db.js';
import authRouter from './routes/authRoutes.js'; // Import your new router file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

// Middleware to parse incoming JSON request bodies
server.use(express.json());

server.use(express.static(path.join(__dirname, 'public')));

// Link your external authentication routing file under the /api path prefix
server.use('/api', authRouter);

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Experiment57 staging environment live at: http://localhost:${PORT}`);
});
