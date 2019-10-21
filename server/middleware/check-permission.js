let app = require('../server');
let constants = require('../../common/constants/constants');
let LoopBackContext = require('loopback-context');
let to = require('await-to-js').to;

module.exports = function () {
  return async function checkAdmin(req, res, next) {
    console.log("check permission middleware invoken")
    let loopbackContext = LoopBackContext.getCurrentContext();
    let token = '';
    let err = new Error();
    err.status = constants.RESPONSE_CODE_UNAUTHORIZED;
    if (loopbackContext) {
      if (req.headers[constants.KEY_AUTHORIZATION]) {
        token = req.headers[constants.KEY_AUTHORIZATION].replace(constants.TYPE_AUTHORIZATION_HEADER, '');
      }
      // Verify Token
      let JWT = require('../../common/utils/jwt')
      let verifiedToken = JWT.verifyToken(token)
      if (!verifiedToken) {
        err.message = 'verify token is null';
        return next(err);
      }
      console.log(verifyToken.userId, req.url)

      let QTUsers_TacNhan = app.models.QTUsers_TacNhan
      let listTacNhan = QTUsers_TacNhan.find({
        where: {
          id: verifiedToken.userId,
          hieuLuc: 1, xoa: 0
          },
        fields: ['qtTacNhanId']
      })
      let QTChucNangPhanMem = app.models.QTChucNangPhanMem
      let chucNangPhanMemId = await QTChucNangPhanMem.findOne({where: {path: req.url}})
      let QTTacNhan_ChucNangPhanMem = app.models.QTTacNhan_ChucNangPhanMem
      for (let i in listTacNhan) {
        tacNhanId = listTacNhan[i].qtTacNhanId
        let tacNhanChucNangPhanMem = await findOne({where: {chucNangPhanMemId: chucNangPhanMemId, tacNhanId: tacNhanId}})
        if (!tacNhanChucNangPhanMem) {
          err.message = "user doesn't have permission to access function"
          return next(err)
        }
      }
      // List roles
      // let UserTacNhan =
      //  Check permission
    }
  }
}
