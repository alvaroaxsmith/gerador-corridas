import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import rideRoutes from './src/routes/rideRoutes.js';
import setupSwagger from './src/swagger.js';

dotenv.config({ path: './.env' });
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/rides', rideRoutes);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação da API em http://localhost:${port}/api-docs`);
});