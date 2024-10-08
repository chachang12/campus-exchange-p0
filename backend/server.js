import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config(); // Initializes the dotenv configuration

const app = express(); // Initializes the express server
const port = process.env.PORT || 5000; // Sets the port to the environment variable PORT or 5000 if the environment variable is not set

app.use(express.json()); // Allows the server to accept JSON objects in the request body (Middleware: functions that run before you send a response to the client)

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    connectDB(); // Initializes the connection to the database
    console.log('Server started at http://localhost:' + port);
});
