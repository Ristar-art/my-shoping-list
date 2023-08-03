// Add this at the beginning of your code to load environment variables from .env file
require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.models')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))

mongoose.connect('mongodb://127.0.0.1:27017/shopping-list');

const UserData = require('./models/user.models');

app.post('/api/add-item', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the token payload
    const userData = await UserData.findById(userId); // Fetch the user data by ID

    if (!userData) {
      return res.status(404).json({ status: 'error', message: 'User data not found' });
    }

    // Add the item to the shoppingList array in the user data
    userData.shoppingList.push(req.body.item);
    await userData.save();

    return res.json({ status: 'ok', message: 'Item added successfully', data: userData });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Failed to add item' });
  }
});

// Endpoint to get all data of the user
app.get('/api/user-data', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the token payload
    const userData = await UserData.findById(userId); // Fetch the user data by ID

    if (!userData) {
      return res.status(404).json({ status: 'error', message: 'User data not found' });
    }

    return res.json({ status: 'ok', data: userData });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Failed to fetch user data' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordRepeat: req.body.passwordRepeat,
    });

    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicated email' });
  }
});

app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({
      name: name,
      password: password,
    });

    if (!user) {
      return res.json({ status: 'error', user: false });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({ accessToken: accessToken, user: true });
  } catch (err) {
    return res.json({ status: 'error', user: false });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(8000, () => {
  console.log('server started');
});
