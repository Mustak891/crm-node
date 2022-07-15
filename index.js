import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { usersRouter } from './routes/users.js';
import { messageRouter } from './routes/message.js';
import cookieParser from 'cookie-parser';
import { employeeRouter } from './routes/employee.js';

const app = express();

dotenv.config();

const Port = process.env.PORT || 4000;

const ConnectionDB = async () => {
    try {
        mongoose.connect(process.env.MongoDB_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (err) {
        console.log(err)
    }
}
await ConnectionDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.options('*', cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/api', usersRouter);

app.use('/api', messageRouter);

app.use('/api', employeeRouter);

app.listen(Port, () => { console.log(`Server is running on port ${Port}`) });
