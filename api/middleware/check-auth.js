const jwt = require('jsonwebtoken');
const config = require("../../config/server");

module.exports = (req, res, next) => {
  try {
    const token = req.session.token;
    const decoded = jwt.verify(token, config.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    //res.redirect('/user/login');
    return res.status(401).json({
      status: false,
      message: 'Unauthorised Access'
    });
  }
};
