import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Gerenciamento de Corridas',
        version: '1.0.0',
        description: 'Documentação da API de gerenciamento de corridas.',
    },
    basePath: '/',
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/rideRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
