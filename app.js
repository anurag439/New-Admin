import express from "express";
import connectToDatabase from './data/database.js';
import routes from './routes/routes.js';
import cookieParser from "cookie-parser";
import path from 'path';
import todoRoutes from './routes/todo.js';
import { set } from "mongoose";
import { fileURLToPath } from 'url';

const app = express();

const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware 

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use('/', routes);
app.use('/', todoRoutes);

// Server-setup

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
