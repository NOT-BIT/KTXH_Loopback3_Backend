let app = require('../../../server/server');
// let LoopBackContext = require('loopback-context');
let to = require('await-to-js').to;
let constants = require('../../constants/constants');
let utils = require('../../utils/utils');

let Promise = require('bluebird')

module.exports = function (Users) {
  Users.addUser = async function (username, password) {
    if (username === null || password == null) {
        data = {
            "statusCode": 123,
            "message": "Username or password is null"
        }
        return data
    }

    console.log(username)
    console.log(password)
    let [err, user] = await to(Users.findOne({where: {username: username}}))
    console.log(user)
    if (user != null) {
        data = {
            "statusCode": 123,
            "message": "Username existed"
        }
        return data
    }

    Users.upsert({
        username,
        password
    })

    data = {
        "statusCode": 200,
        "message": "Success"
    }

    return data
  }

  Users.checkModel = async function() {
    //   let models = app.models
    //   console.log(models)
    //   let QCTinh = models.QCTinh
    //   console.log(QCTinh)
    //   console.log(app.models)
    let QCTinh = app.models.QCTinh
    data = {
        id: 1,
        hieuLuc: 1,
        ma: '12',
        ten: 'name',
        xoa: '0'
    }
    QCTinh.upsert(data)
      return 'OK'
  }

  Users.remoteMethod(
      'checkModel', {
          http: {path: '/checkModel', verb: 'get'},
          accepts: [],
          returns: {arg: 'message', type: 'string'}
      }
  )

  Users.remoteMethod(
      'addUser', {
          http: {path: '/addUser', verb: 'post'},
          accepts: [
              {arg: 'username', type: 'string', required: true},
              {arg: 'password', type: 'string', required: true}
          ],
          returns: {arg: 'data', type: 'object'}
      }
  )
}
