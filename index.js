import express from 'express';
import setupSwagger from './src/swagger.js';
import rideRoutes from './src/routes/rideRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/rides', rideRoutes);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;