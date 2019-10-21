let app = require('../server');
let constants = require('../../common/constants/constants');
let LoopBackContext = require('loopback-context');
let to = require('await-to-js').to;

module.exports = function () {
  return async function checkAdmin(req, res, next) {
    let loopbackContext = LoopBackContext.getCurrentContext();
    let token = '';
    let err = new Error();
    err.status = constants.RESPONSE_CODE_UNAUTHORIZED;
    if (loopbackContext) {
      if (req.headers[constants.KEY_AUTHORIZATION]) {
        token = req.headers[constants.KEY_AUTHORIZATION].replace(constants.TYPE_AUTHORIZATION_HEADER, '');
      }
      let jwtModel = app.models.Jwt;
      let verifiedToken = jwtModel.verifyToken(token);
      if (!verifiedToken) {
        err.message = 'verify token is null';
        return next(err);
      }

      let userId = verifiedToken.body.userId;
      let modelUser = app.models.CustomUser;
      let [errAdmin, admin] = await to(modelUser.findOne({
        where: {
          and: [
            {id: userId},
            {status: constants.STATUS_ACTIVE},
            {
              or: [
                {adminType: constants.TYPE_ADMIN_NORMAL},
                {adminType: constants.TYPE_ADMIN_FOUNDER},
              ],
            },
          ],
        },
      }));

      if (errAdmin) {
        err.message = 'error find admin';
        return next(err);
      }
      if (!admin) {
        err.message = 'cannot find admin';
        return next(err);
      }

      loopbackContext.set(constants.KEY_ADMIN, admin);
      return next();
    }
    err.message = 'context is null';
    return next(err);
  };
};
