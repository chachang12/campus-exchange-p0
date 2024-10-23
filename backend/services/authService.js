import User from '../models/user.model.js';

export const getUserByStringId = async (id) => {
  try {
    const user = await User.findOne({ googleId: id });
    return user;
  } catch (error) {
    console.error(`Error fetching user by ID: ${error.message}`);
    return null;
  }
};