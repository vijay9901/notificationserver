const express = require('express')
const app = express()
const cors = require('cors');
const createError = require('http-errors');
require('./models/dbconfig');
const port = process.env.PORT || 3000
const indexRouter = require('./routers/index');
const notification = require('./routers/notification');

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter); 
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;