const HttpStatus = require('http-status-codes');
const app = require('../../../server/server.js');

module.exports = function(QTUsers) {

  QTUsers.createUser = async function(username, password, hoVaTen, ghiChu, nguoiTaoId, qtDonViId) {
    const QTUsersModel = app.models.QTUsers;
    // TODO: check nguoiTaoId
    // TODO: hash password

    let user;
    try {
      user = await QTUsersModel.findOne({where: {username: username}, fields: {id:1}});
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
    if(user) {
      return [HttpStatus.BAD_REQUEST, {username: `username ${username} already exist`}]
    }
    let datetimeNow = new Date();
    let newUser = {
      username: username,
      password: password,
      hoVaTen: hoVaTen,
      ngayTao: datetimeNow,
      ghiChu: ghiChu,
      qtDonViId: qtDonViId
    }
    try {
      user = await QTUsersModel.create(newUser);
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
    return [HttpStatus.OK, user]
  }

  QTUsers.getUsers = async function(limit, offset) {
    limit = limit || 20;
    offset = offset || 0;
    const QTUsersModel = app.models.QTUsers;
    let users;
    try {
      users = await QTUsers.find({where: {'xoa':0}, limit: limit, skip: offset});
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
    return [HttpStatus.OK, users]
  }

  QTUsers.getOneUser = async function(id) {
    let user;
    try {
      user = await QTUsers.findOne({where: {'id': id, 'xoa': 0}});
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
    if(user) {
      return [HttpStatus.OK, user]
    } else {
      return [HttpStatus.NOT_FOUND, `Not found user id ${id}`]
    }

  }

  QTUsers.deleteUser = async function(userId) {
    const QTUsersModel = app.models.QTUsers;
    try{
      let user = await QTUsersModel.findOne({where: {id: userId, xoa: 0}, fields: {'id': 1}});
      if(!user) {
        return [`Not found user id ${userId}`, HttpStatus.NOT_FOUND];
      }
      await QTUsersModel.update({id: userId}, {xoa: 1});
      return [HttpStatus.OK, `Deleted user id ${userId}`];

    }catch(err) {
      // TODO: this is for debug, change this for product
      console.log(err);
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
  }

  QTUsers.updateUserProfile = async function(userId, newPassword, hoVaTen, ghiChu, qtDonViId) {
    const QTUsersModel = app.models.QTUsers;
    let user;
    try{
      user = await QTUsersModel.findOne({where: {id: userId, xoa: 0}});
    }catch(err) {
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
    if(!user) {
      return [HttpStatus.NOT_FOUND, `Not found user id ${userId}`]
    }
    let userUpdated = {
      'password': newPassword || user['password'],
      'hoVaTen': hoVaTen || user['hoVaTen'],
      'ghiChu': ghiChu || user['ghiChu'],
      'qtDonViId': qtDonViId || user['qtDonViId']
    }
    let info;
    try{
      info = await QTUsersModel.updateAll({id: userId, xoa: 0}, userUpdated);
    }catch(err) {
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
    return [HttpStatus.OK, `updated user id ${userId}`];
  }

  QTUsers.updateUserPassword = async function(userId, oldPassword, newPassword) {
    const QTUsersModel = app.models.QTUsers;
    let user;
    try{
      user = await QTUsersModel.findOne({where: {id: userId, xoa: 0}, fields: {password: 1}});
    }catch(err) {
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
    if(!user) {
      return [HttpStatus.NOT_FOUND, `Not found user id ${userId}`]
    }
    // TODO: migrate to hash password
    if(oldPassword !== user['password']) {
      return [HttpStatus.BAD_REQUEST, `Password is incorrect`]
    }
    let updatedUser = {'password': newPassword};
    try{
      user = await QTUsersModel.updateAll({id: userId}, updatedUser);
    }catch(err) {
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err];
    }
    return [HttpStatus.OK, 'Password is updated'];
  }

  QTUsers.remoteMethod(
    'createUser', {
      http: {path: '/', verb: 'post'},
      accepts: [
        {arg: 'username', type: 'string', required: true},
        {arg: 'password', type: 'string', required: true},
        {arg: 'ho_va_ten', type: 'string', required: true},
        {arg: 'ghi_chu', type: 'string'},
        {arg: 'nguoi_tao_id', type: 'string'},
        {arg: 'qt_don_vi_id', type: 'string'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'object'}]
    }
  )
  QTUsers.remoteMethod(
    'getUsers', {
      http: {path: '/', verb: 'get'},
      accepts: [
        {arg: 'limit', type: 'number'},
        {arg: 'offset', type: 'number'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'object'}]
    }
  )
  QTUsers.remoteMethod(
    'getOneUser', {
      http: {path: '/:id', verb: 'get'},
      accepts: [ {arg: 'id', type: 'number'} ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'object'}]
    }
  )

  QTUsers.remoteMethod(
    'deleteUser', {
      http: {path: '/:id', verb: 'delete'},
      accepts: [{arg: 'id', type: 'number'}],
      returns: [
        {arg: 'status', type: 'number'},
        {arg: 'message', type: 'string'},
      ]
    }
  )

  QTUsers.remoteMethod(
    'updateUserProfile', {
      http: {path: '/:id', verb: 'put'},
      accepts: [
        {arg: 'id', type: 'number'},
        {arg: 'new_password', type: 'string'},
        {arg: 'ho_va_ten', type: 'string'},
        {arg: 'ghi_chu', type: 'string'},
        {arg: 'qt_don_vi_id', type: 'string'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'string'}]
    }
  )

  QTUsers.remoteMethod(
    'updateUserPassword', {
      http: {path: '/:id/change-password', verb: 'put'},
      accepts: [
        {arg: 'id', type: 'number'},
        {arg: 'old_password', type: 'string', required: true},
        {arg: 'new_password', type: 'string', required: true},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'string'}]
    }
  )
}

