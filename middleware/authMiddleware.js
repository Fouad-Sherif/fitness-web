const jwt = require('jsonwebtoken');
const SECRET_KEY = 'fouad_is_writing';

exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate token' });
    req.userId = decoded.id;
    req.ISADMIN = decoded.ISADMIN;
    next();
  });
};
