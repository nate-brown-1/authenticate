// base64 for encoding/decoding
const base64 = require('base-64');

const { user } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) { 
    return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basic).split(':');

  try {
    req.user = await user.model.authenticateBasic(username, password);
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};
