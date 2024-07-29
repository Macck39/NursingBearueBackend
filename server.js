import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import enquiryRouter from './routes/enquiryRouter.js';
import requestRouter from './routes/requestRouter.js';



dotenv.config({
  path :'./data/.env'
})


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ["http://localhost:3000"],
  })
);
const PORT = process.env.PORT;


//connect db

async function connectDB(){
  try{
    const { connection } = await mongoose.connect(process.env.MONGOURL)
    console.log(`db connected at ${connection.port}`)
  } catch(err){
    console.log(`something err in connecting db -- ${err}`)
  }

}
connectDB();

// routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/enquiry', enquiryRouter)
app.use('/api/v1/request', requestRouter)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});