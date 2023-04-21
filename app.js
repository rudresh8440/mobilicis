require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {}).then(() => {
  console.log('database connected successfully');
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoutes = require('./routes/userRoutes');

app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log('server running sucessfully ', PORT);
});
