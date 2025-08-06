const express = require('express');
const cors = require('cors');
const contactRouter = require('./routes/contact');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});