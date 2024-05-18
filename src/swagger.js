import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const API = process.env.API_BASE_URL
const NODE_ENV = process.env.NODE_ENV

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Corridas',
            version: '1.0.0',
        },
        servers: [{
            url: NODE_ENV === 'production' ? API : 'http://localhost:3000',
            description: NODE_ENV === 'production' ? 'Servidor de Produção' : 'Servidor de Desenvolvimento',
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