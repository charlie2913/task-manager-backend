const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    console.log('Usuario autenticado:', req.userId);
    next();
  });
};
