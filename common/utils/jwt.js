var nJwt = require('njwt');
let app = require('../../server/server');
let constants = require('../constants/constants');
var secretKey = app.get('SECRET_KEY_JWT') || "TEST";

generateToken = async function (user) {
  // console.log(user)
    var claims = {
      userId: user.id,
      email: user.email,
      // checkedId: user.password,
      // type: user.adminType,
    };

    let timeExpire = user.timeExpire;
    if (!timeExpire) {
      timeExpire = constants.TIME_EXPIRE_USER;
    }

    console.log(claims)
    console.log(secretKey)
    var jwt = nJwt.create(claims, secretKey);
    // console.log(jwt)
    jwt.setExpiration(new Date().getTime() + timeExpire); // One hour from now
    return jwt.compact();
};

verifyToken = async function (token) {
    // log.debug(token);
    try {
      let verifiedJwt = nJwt.verify(token, secretKey);
      return verifiedJwt;
    } catch (e) {
      log.error(e);
      return null;
    }
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken
}