const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db')
const authRoutes=require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config()
const app=express();
const PORT=5000;
connectDB()


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
