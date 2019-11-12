import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';

const URL_DB = 'mongodb+srv://root:root@hypertube-fdnbo.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.listen(8080, () => {
  console.log('Server running on 8080');
});

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
