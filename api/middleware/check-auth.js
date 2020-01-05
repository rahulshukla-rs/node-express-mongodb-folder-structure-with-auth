const jwt = require('jsonwebtoken');
const config = require("../../config/server");
const acl = require("../../config/acl");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_KEY);
    req.userData = decoded;

    /* Check URL Access Start */
    let access = acl.checkAccess(req.userData.role, req.baseUrl);
    if (access) next();
    else return res.status(401).json({
      status: false,
      message: 'Unauthorised Access'
    });
    /* Check URL Access End */

  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorised Access'
    });
  }
};
