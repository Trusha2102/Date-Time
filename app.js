const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const timeRoutes = require('./routes/timeRoutes');
const addSubtractRoutes = require('./routes/addSubtractRoutes');
const convertRoutes = require('./routes/convertRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/time-between', timeRoutes);
app.use('/add-subtract', addSubtractRoutes);
app.use('/convert', convertRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
