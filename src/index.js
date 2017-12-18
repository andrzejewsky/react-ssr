import 'babel-polyfill';
import express from 'express';
import React from 'react';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helper/rendrer';
import createStore from './helper/createStore';

const app = express();

app.use(
  '/api',
  proxy(
    'http://react-ssr-api.herokuapp.com',
    {
      proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';

        return opts;
      }
    }
  )
)
app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = createStore(req);

  const promisses = matchRoutes(Routes, req.path)
    .map(
      ({ route }) => route.loadData ? route.loadData(store) : null
    )
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    })

  const render = () => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);    
  };

  Promise.all(promisses)
    .then(render)
    .catch(render);
});

app.listen(3000, () => {
  console.log('listening on 3000...')
});
