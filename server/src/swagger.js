require('dotenv').config();
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const yaml = require('js-yaml');

const options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'Campus Events and Entertainment Center API',
      version: '1.0.0',
      description: 'API for managing campus events and entertainment',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
      {
        url: 'http://217.142.229.202/api',
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
  failOnErrors: true,
};

const specs = swaggerJsdoc(options);

const yamlString = yaml.dump(specs);

fs.writeFile('swagger-auto-generated.yaml', yamlString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('YAML file has been saved.');
  }
});

module.exports = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true}),
  );
  console.log(
    `API documentation available at http://${process.env.LISTEN_HOST}:${process.env.LISTEN_PORT}/api-docs`,
  );
};
