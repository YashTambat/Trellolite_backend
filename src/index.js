import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import { connectDB } from './lib/db.js';
import job from './lib/cron.js';

const app = express();
const PORT = process.env.PORT || 3000;

job.start();         // for physical phone make it open and for simulator make it close
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",              // local dev
    "https://trellolite-frontend.vercel.app/login"     // your Vercel frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);   // <-- fixed
app.use("/api/team", teamRoutes);



app.listen(PORT , ()=>{
  console.log(`Server is running on ${PORT}`)
  connectDB();
})