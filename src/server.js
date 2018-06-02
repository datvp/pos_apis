/* eslint-disable */
/* @flow */

import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import chalk from 'chalk';
import cors from 'cors';
import BodyParser from 'body-parser';
import CookieParser from 'cookie-parser';
import Promise from 'bluebird';
import path from 'path';

import { port, host, payloadLimit as limit } from './config';
import apis from './apis';

const app = express();

// Enable all cors request
app.use(cors());
// Use helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution.
app.use(hpp());
// Compress all requests
app.use(compression());

app.use(BodyParser.urlencoded({	extended: false	}));
app.use(BodyParser.json({ limit }));
app.use(BodyParser.urlencoded({ limit, extended: true }));
app.use(BodyParser.text());
app.use(CookieParser());

if (!__DEV__) {
  app.use(express.static(path.resolve(process.cwd(), 'public')));
} else {
  /* Run express as webpack dev server */

  const webpack = require('webpack');
  const webpackConfig = require('../tools/webpack/config.babel');
  const compiler = webpack(webpackConfig);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, // Turn it on for friendly-errors-webpack-plugin
      noInfo: true,
      stats: 'minimal',
      serverSideRender: true
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false // Turn it off for friendly-errors-webpack-plugin
    })
  );
}

app.use(apis);

if (port) {
  app.listen(port, host, err => {
    const url = `http://${host}:${port}`;

    if (err) console.error(`==> 😭  OMG!!! ${err}`);

    console.info(chalk.green(`==> 🌎  Listening at ${url}`));

    Promise.onPossiblyUnhandledRejection((error, p) => {
      console.log('error', error);
      console.log('promise', p);
    });

    process.on('unhandledRejection', (reason, p) => {
      console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    });
  });
} else {
  console.error(
    chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified')
  );
}
