var createError = require('http-errors');
var express = require('express');
require('./database/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/**
 * Swagger
 */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(process.env.port || 3500, () => {
  console.log(`App listening on port ${process.env.port}`)
})

module.exports = app;
