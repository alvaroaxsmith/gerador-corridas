import express from 'express';
import setupSwagger from './src/swagger.js';
import rideRoutes from './src/routes/rideRoutes.js';

const app = express();

app.use('/rides', rideRoutes);

setupSwagger(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
