import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import favicon from 'serve-favicon';

import router from './router';

const URL_DB = 'mongodb+srv://root:root@hypertube-fdnbo.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const app = express();
app.set('root', '/');
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'views', 'favicon.ico')));
app.use('public/', express.static('public'));
app.use(morgan('dev'));

// I need this to use body-parser to acces `req.body`,
// don't know why jcharloi didn't needed it in /back-signup
app.use(express.json());

/* Webpack Hot Reload */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

const compiler = webpack(webpackConfig);
const hotMiddleware = webpackHotMiddleware(compiler);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath,
}));

app.use(hotMiddleware);

/* eslint-enable */
/* ------------------ */

app.use('/API', router);
app.get('*', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('Server running on 8080');
});
