const express = require('express');
require('dotenv').config();
const userRoute = require('./routes/userRoute');
const notesRoute = require('./routes/notesRoute')
require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/user', userRoute);
app.use('/api/notes', notesRoute);

app.listen(port, () => {
    console.log(`App is listenning at http://localhost:${port}`);
});