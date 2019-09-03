const HttpStatus = require('http-status-codes');
const app = require('../../../server/server.js');

module.exports = async function(QTTacNhan) {
  QTTacNhan.createTacNhan = async function(sysCapHanhChinhId, ten, hieuLuc, ghiChu){
    const QTTacNhanModel = app.models.QTTacNhan;
    let newTacNhan = {
      sysCapHanhChinhId: sysCapHanhChinhId,
      ten: ten,
      hieuLuc: hieuLuc,
      ghiChu: ghiChu
    };
    let tacNhan;
    try {
      tacNhan = await QTTacNhanModel.create(newTacNhan);
    }catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
    return [HttpStatus.OK, tacNhan];
  }

  QTTacNhan.updateTacNhan = async function(id, sysCapHanhChinhId, ten, hieuLuc, ghiChu) {
    const QTTacNhanModel = app.models.QTTacNhan;
    try {
      tacNhan = await QTTacNhanModel.findOne({where: {id, xoa:0}});
      if(!tacNhan) {
        return [HttpStatus.NOT_FOUND, `Not found tac_nhan id ${id}`];
      }
      let updateTacNhan = {
        sysCapHanhChinhId: sysCapHanhChinhId || tacNhan['sysCapHanhChinhId'],
        ten: ten || tacNhan['ten'],
        hieuLuc: hieuLuc || tacNhan['hieuLuc'],
        ghiChu: ghiChu || tacNhan['ghiChu']
      };
      await QTTacNhan.updateAll({id: id}, updateTacNhan);
      return [HttpStatus.OK, `updated tac_nhan id ${id}`]
    }catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
  }

  QTTacNhan.getTacNhan = async function(limit, offset) {
    const QTTacNhanModel = app.models.QTTacNhan;
    let tacNhan;
    try {
      tacNhan = await QTTacNhanModel.find({where: {xoa: 0}, limit: limit, offset: offset});
      return [HttpStatus.OK, tacNhan];
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
  }

  QTTacNhan.getOneTacNhan = async function(id) {
    const QTTacNhanModel = app.models.QTTacNhan;
    let tacNhan;
    try {
      tacNhan = await QTTacNhanModel.findOne({where: {id, xoa: 0}});
      if(!tacNhan) {
        return [HttpStatus.NOT_FOUND, `Not found tac_nhan id ${id}`];
      }
      return [HttpStatus.OK, tacNhan];
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
  }

  QTTacNhan.deleteTacNhan = async function(id) {
    const QTTacNhanModel = app.models.QTTacNhan;
    try {
      tacNhan = await QTTacNhanModel.findOne({where: {id: id, xoa: 0}, fields: {id: 1}});
      if(!tacNhan) {
        return [HttpStatus.NOT_FOUND, `Not found tac_nhan id ${id}`];
      }
      await QTTacNhanModel.updateAll({id: id}, {xoa: 1});
      return [HttpStatus.OK, `Deleted tac_nhan id ${id}`];
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
  }



  QTTacNhan.remoteMethod(
    'createTacNhan', {
      http: {path: '/', verb: 'post'},
      accepts: [
        {arg: 'sys_cap_hanh_chinh_id', type: 'string'},
        {arg: 'ten', type: 'string'},
        {arg: 'hieu_luc', type: 'string'},
        {arg: 'ghi_chu', type: 'string'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'object'}]
    }
  )

  QTTacNhan.remoteMethod(
    'getTacNhan', {
      http: {path: '/', verb: 'get'},
      accepts: [
        {arg: 'limit', type: 'number'},
        {arg: 'offset', type: 'number'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'object'}]
    }
  )

  QTTacNhan.remoteMethod(
    'getOneTacNhan', {
      http: {path: '/:id', verb: 'get'},
      accepts: [
        {arg: 'id', type: 'number'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'object'}]
    }
  )

  QTTacNhan.remoteMethod(
    'deleteTacNhan', {
      http: {path: '/:id', verb: 'delete'},
      accepts: [
        {arg: 'id', type: 'number', required: true},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'string'}]
    }
  )

  QTTacNhan.remoteMethod(
    'updateTacNhan', {
      http: {path: '/:id', verb: 'put'},
      accepts: [
        {arg: 'id', type: 'number', required: true},
        {arg: 'sys_cap_hanh_chinh_id', type: 'string'},
        {arg: 'ten', type: 'string'},
        {arg: 'hieu_luc', type: 'string'},
        {arg: 'ghi_chu', type: 'string'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'string'}]
    }
  )
}

