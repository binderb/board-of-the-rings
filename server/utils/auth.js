const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    if (!token) {
      console.log('no token supplied');
      return req;
    }
    console.log("Here's the token:", token)
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log("User data, where you at?", data)
      req.user = data;
    } catch(e) {
      console.log('Invalid token', e);
    }
    console.log(req.user)
    return req;
  },
  signToken: function({ _id, username, displayName }) {
    const payload = { _id, username, displayName };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
