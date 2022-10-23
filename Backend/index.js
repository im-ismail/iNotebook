const express = require('express');
require('dotenv').config();
const userRoute = require('./Routes/userRoute');
const notesRoute = require('./Routes/notesRoute')
require('./Models/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/user', userRoute);
app.use('/api/notes', notesRoute);

app.listen(port, () => {
    console.log(`App is listenning at http://localhost:${port}`);
});