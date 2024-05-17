import express, { json } from 'express';
import { config } from 'dotenv';
import rideRoutes from './src/routes/rideRoutes.js'; // Add .js if necessary

config();

const app = express();
app.use(json());

app.use('/rides', rideRoutes);  // Assuming rideRoutes is a function or object

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
