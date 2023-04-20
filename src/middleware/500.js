'use strict';

function handle500 (err, request, response, next) {

  const error = err.message ? err.message : err;
  console.error('error 404, see error message' + error);
  response.status(404).send('Internal server error!');
}

module.exports = handle500;
