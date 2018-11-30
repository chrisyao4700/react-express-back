const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const apiRoute = require('./routes/api.route');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// TODO: custom routes
app.use(express.static(path.join(__dirname, 'front-end/build')));
app.use('/api', apiRoute);


app.get('*', (req, res, next) => {
    const file_path = `${__dirname}/front-end/build/index.html`;
    res.sendFile(path.join(file_path));
});
// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({
        status: false,
        message: err.message || err
    });
});

module.exports = app;
