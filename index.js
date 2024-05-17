const express = require('express');
const dotenv = require('dotenv');
const rideRoutes = require('./src/routes/rideRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/rides', rideRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
