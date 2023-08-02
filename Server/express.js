require("dotenv").config()

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.models')
const jwt = require('jsonwebtoken')
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/data');  

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
 
  const user = await User.findOne({
    name: req.body.name,
    password: req.body.password,
})
if(user){
  const token = jwt.sign({
       name: req.body.name,
       email: req.body.email,
      
  }, 'secret123')
  return res.json({status:'ok', user: true})
}else {
  return res.json({status: 'error', user: false})
}
});

app.listen(8000, () => {
  console.log('server started'); 
});
 