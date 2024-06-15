const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const User = require('./models/User'); // Assuming your User model is in a models folder
const notificationsRoutes = require ('./routes/notifications')
const dotenv = require('dotenv')
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB Setup
mongoose.connect(process.env.MONGO_URI);
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
    });
    mongoose.connection.on('error', (err) => {
      console.log('Error connecting to MongoDB:', err);
      });
// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use('/notifications', notificationsRoutes)

// Profile Route
app.post('/api/profile', upload.single('profilePicture'), async (req, res) => {
  try {
    const { username, bio } = req.body;
    const newUser = new User({
      username,
      bio,
      profilePicture: req.file.path,
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
