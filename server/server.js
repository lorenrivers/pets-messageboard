import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.listen('7700', () => {
    console.log('Ah yes, the server is listening');
})