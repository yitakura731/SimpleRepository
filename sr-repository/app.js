const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const i18next = require('i18next');
const config = require('config');
const middleware = require('i18next-express-middleware');
const fsBackend = require('i18next-node-fs-backend');
const boom = require('boom');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const apiController = require('./controller/api');

const app = express();

app.set('views', 'public');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.options('*', cors());

i18next
  .use(middleware)
  .use(fsBackend)
  .init({
    lng: 'ja',
    fallbackLng: 'ja',
    backend: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json'
    }
  });
app.use(middleware.handle(i18next));

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Simple Repository API',
      version: '0.0.2',
      description: 'Simple Repository API'
    },
    basePath: `/${config.get('appLabel')}/api`,
    consumes: ['application/json'],
    produces: ['application/json']
  },
  apis: ['./controller/api.js']
});

app.use(`/${config.get('appLabel')}/api-docs`, swaggerUi.serve);
app.get(`/${config.get('appLabel')}/api-docs`, swaggerUi.setup(swaggerSpec));

app.use(`/${config.get('appLabel')}/api`, apiController);

app.use((req, res, next) => {
  next(boom.notFound(i18next.t('errorNotFound')));
});

app.use((err, req, res, next) => {
  if (boom.isBoom(err)) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else if (err instanceof TypeError) {
    res.status(403).json({
      StatusCode: 403,
      error: 'Invalid Request Parameter',
      message: err.message
    });
  } else {
    res.status(500).json({
      StatusCode: 500,
      error: 'Internal Server Error',
      message: err.message
    });
  }
});

module.exports = app;
