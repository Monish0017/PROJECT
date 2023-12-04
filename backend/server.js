const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/myloginapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Received login request:', { username, password }); // Add this line

  User.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error('Server error:', err); // Add this line
      res.status(500).send('Server error');
    } else if (user) {
      console.log('Login successful'); // Add this line
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid credentials'); // Add this line
      res.status(401).send('Invalid credentials');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
