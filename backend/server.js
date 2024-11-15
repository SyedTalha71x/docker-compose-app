import mongoose from "mongoose";
import connectDB from "./db.js";
import { configDotenv } from "dotenv";
import express from 'express'
import cors from 'cors'

configDotenv();
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('users', userSchema);

app.get('/user', async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json((user)); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use('/', (req,res)=>{
    res.send('Server is working')

})

app.listen(PORT, () => {
  console.log(`Server is running on port http://192.168.18.195:${PORT}`);
});
