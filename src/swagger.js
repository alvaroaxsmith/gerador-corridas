import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Corridas',
            version: '1.0.0',
        },
        servers: [{
            url: process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL : 'http://localhost:3000',
            description: process.env.NODE_ENV === 'production' ? 'Servidor de Produção' : 'Servidor de Desenvolvimento',
        }, ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: []
        }],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;