const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API EMMYLI DE MORAIS FOTOGRAFIAS',
      version: '1.0.0',
      description: 
        'Este projeto tem como objetivo criar uma plataforma completa para fotógrafos profissionais gerenciarem seus trabalhos de forma eficiente. A solução centraliza a organização de álbuns, a venda de fotos e a entrega digital de imagens, eliminando a necessidade de múltiplas plataformas.',
      license: {
        name: 'Copyright © 2024. Todos os direitos reservados.',
        url: 'https://www.emmylidemoraisfotografias.com.br/sobre-nos/',
      },
      contact: {
        name: 'EMMYLI DE MORAIS FOTOGRAFIAS',
        url: 'https://www.emmylidemoraisfotografias.com.br/contato/',
        email: 'emmylidemorais@emmylifotografias.com.br',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/**/*.js'], // Caminho para os arquivos de rotas
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
