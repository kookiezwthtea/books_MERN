import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
//app.use(cors());

// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);



app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('My Books');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }
  
  module.exports = allowCors(handler)
  
