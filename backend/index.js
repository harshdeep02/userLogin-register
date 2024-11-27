import express from 'express'
import connectToMongo from './db.js';
import { router } from './routes/auth.js';
import cors from 'cors';
const app = express()
const port =  5000;

app.use(cors());
app.use(express.json());
app.use('/', router)

const startServer = async () => {
    await connectToMongo();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  };
  
  startServer();
  console.log("connec");
