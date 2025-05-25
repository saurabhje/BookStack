require('dotenv').config();
const express = require('express');
const connectDb = require('./connectDb');
const cors = require('cors');
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const path = require('path');
const {checkAuthentication, restrictTo} = require('./middlewares/auth');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5555;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(checkAuthentication);
app.use(express.static(path.resolve(__dirname, 'uploads')));



app.use('/user', userRouter);
app.use('/admin', restrictTo('ADMIN'), adminRouter);

app.listen(PORT, () => {  
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});