require('dotenv').config();
const express = require('express');
const connectDb = require('./connectDb');
const cors = require('cors');
const userRouter = require('./routes/user')
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5555;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// app.use(cors());

app.use(express.static(path.resolve(__dirname, 'uploads')));
app.use(express.json());



app.use('/user', userRouter);


app.listen(PORT, () => {  
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});