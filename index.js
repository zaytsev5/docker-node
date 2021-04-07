const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://zaytsev:'+ encodeURIComponent('zaytsev5') + '@test-users-e8bxl.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const User = require('./models/User');

app.get('/', (req, res) => {
  // let items = {
  //   name: "nguyevanhai"
  // }
  // res.render('index', { items })
  User.find()
    .then(users => res.render('index', { users }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  let users = [{
    email: "ivanxaytsev@gmail.com"
  }]
  res.render('index', { users })
  // const newItem = new Item({
  //   name: req.body.name
  // });

  // newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running on...'));
