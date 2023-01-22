var createError = require('http-errors');
var express = require('express');
require('./database/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const https = require('https');

// PROTECT ALL ROUTES WITH API KEY
app.use((req, res, next) => {
  const apiKey = req.get('API-Key')
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({error: 'unauthorised'})
  } else {
    next()
  }
})

/**** SWAGGER UI */
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "SMARTCITIES",
      version: "1.0.0",
      description: "SMARTCITIES API"
    },
    host: 'localhost:3000',
    schemes: [
      "https"
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    basePath: '/api/v1',
    securityDefinitions: {
      basicAuth: {
        type: 'basic',
        in: 'header',
        name: 'basicAuth'
      }
    },
  },
  swagger: "2.0",
  apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**** */


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const options = {

}

//https.createServer(options, app).listen(process.env.port || 3500, () => {

  app.listen(process.env.port || 3500, () => {
  console.log(`App listening on port ${process.env.port}`)
})

module.exports = app;
