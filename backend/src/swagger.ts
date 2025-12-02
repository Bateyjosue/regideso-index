import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Regideso Index API',
      version: '1.0.0',
      description: 'API documentation for Regideso Index backend services',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
      {
        url: 'https://regideso-index.onrender.com',
        description: 'Production server',
      },
    ],
  },
  apis: ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
