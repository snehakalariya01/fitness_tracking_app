const express = require('express');
const app = express();
const connectDB = require('./db/dbConnection');
const userRoutes = require('./Routes/UserRoutes');
require('dotenv').config();


const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const workoutRoutes = require('./Routes/workoutRoutes');
const exerciseRoutes = require('./Routes/exerciseRoutes');
const challengeRoutes = require('./Routes/challengeRoutes');

app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/challenges', challengeRoutes);

app.get('/', (req, res) => {
  res.send('root is working');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

