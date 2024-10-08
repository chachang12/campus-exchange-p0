import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization header is required' });
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id }).select('_id');

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    return res.status(401).json({ error: 'Request is not authorized' });
  }
};