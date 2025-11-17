import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import voiceRoutes from './routes/voice.js';
import tokenRoutes from './routes/token.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use('/voice', voiceRoutes);
app.use('/token', tokenRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;