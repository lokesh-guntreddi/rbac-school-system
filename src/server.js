const express = require('express');
const dotenv = require('dotenv').config()
const path = require('path');
const mongoConnect = require('./config/config')
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/', (req, res) => {
  res.render('home');
});
app.use('/auth', require('./routes/authRoutes'));
app.use('/user', require('./routes/userRoutes'));


// Start the server
const PORT = process.env.PORT || 6002;
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
    
});
mongoConnect()