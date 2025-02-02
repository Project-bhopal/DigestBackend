const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();  // Load environment variables

// Initialize Express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
// In your app.js or server.js
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors({
  origin: 'https://startupdigest.in', // Replace with your frontend URL
  // origin:'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // Allow cookies if needed
}));

app.use(express.json());

// Your routes here
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

connectDB(); // Connect to MongoDB

// Use routes
// Render the form page when visiting the root route
app.get('/', (req, res) => {
  res.render('createPost'); // Will render the createPost.ejs file
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
   

// Export app
module.exports = app;
