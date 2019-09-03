const HttpStatus = require('http-status-codes');
const app = require('../../../server/server.js');

module.exports = function(BieuNhapLieu) {
  BieuNhapLieu.createBieuNhapLieu = async function(sysLoaiBieuNhapLieuId, tenBieu, kyHieuBieu, donViNhanBaoCao,
      donViNhapLieu, donViTongHop, kyBaoCao, hieuLuc) {
    const BieuNhapLieuModel = app.models.BieuNhapLieu;
    let newBieuNhapLieu = {
      sysLoaiBieuNhapLieuId,
      tenBieu,
      kyHieuBieu,
      donViNhanBaoCao,
      donViNhapLieu,
      donViTongHop,
      kyBaoCao,
      hieuLuc
    }
    let bieuNhapLieu;
    try {
      bieuNhapLieu = await BieuNhapLieuModel.create(newBieuNhapLieu);
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err];
    }
    return [HttpStatus.OK, bieuNhapLieu];
  }

  BieuNhapLieu.remoteMethod(
    'createBieuNhapLieu',{
      http: {path: '/', verb: 'post'},
      accepts: [
        {arg: 'sys_loai_bieu_nhap_lieu_id', type: 'number', required: true},
        {arg: 'ten_bieu', type: 'string', required: true},
        {arg: 'ky_hieu_bieu', type: 'string', required: true},
        {arg: 'don_vi_nhan_bao_cao', type: 'string', required: true},
        {arg: 'don_vi_nhap_lieu', type: 'string', required: true},
        {arg: 'don_vi_tong_hop', type: 'string', required: true},
        {arg: 'ky_bao_cao', type: 'string', required: true},
        {arg: 'hieu_luc', type: 'number', required: true},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'object'}]
    }
  )

  BieuNhapLieu.updateBieuNhapLieu = async function(id, sysLoaiBieuNhapLieuId, tenBieu, kyHieuBieu, donViNhanBaoCao,
      donViNhapLieu, donViTongHop, kyBaoCao, hieuLuc) {
    const BieuNhapLieuModel = app.models.BieuNhapLieu;
    try {
      bieuNhapLieu = await BieuNhapLieuModel.findOne({where: {id, xoa:0}, fields: {id: 1}});
      if(!bieuNhapLieu) {
        return [HttpStatus.NOT_FOUND, `Not found bieu_nhap_lieu id ${id}`];
      }
      let updateBieuNhapLieu = {
        sysLoaiBieuNhapLieuId,
        tenBieu,
        kyHieuBieu,
        donViNhanBaoCao,
        donViNhapLieu,
        donViTongHop,
        kyBaoCao,
        hieuLuc
      };
      await BieuNhapLieuModel.updateAll({id: id}, updateBieuNhapLieu);
      return [HttpStatus.OK, `Updated bieu_nhap_lieu id ${id}`]
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err];
    }
  }

  BieuNhapLieu.remoteMethod(
    'updateBieuNhapLieu',{
      http: {path: '/:id', verb: 'put'},
      accepts: [
        {arg: 'id', type: 'number', require: true},
        {arg: 'sys_loai_bieu_nhap_lieu_id', type: 'number'},
        {arg: 'ten_bieu', type: 'string'},
        {arg: 'ky_hieu_bieu', type: 'string'},
        {arg: 'don_vi_nhan_bao_cao', type: 'string'},
        {arg: 'don_vi_nhap_lieu', type: 'string'},
        {arg: 'don_vi_tong_hop', type: 'string'},
        {arg: 'ky_bao_cao', type: 'string'},
        {arg: 'hieu_luc', type: 'number'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'string'}]
    }
  )

  BieuNhapLieu.getBieuNhapLieu = async function(limit, offset) {
    const BieuNhapLieuModel = app.models.BieuNhapLieu;
    let bieuNhapLieu;
    try {
      bieuNhapLieu = await BieuNhapLieuModel.find({where: {xoa: 0}, limit: limit, offset: offset});
      return [HttpStatus.OK, bieuNhapLieu];
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
  }

  BieuNhapLieu.remoteMethod(
    'getBieuNhapLieu', {
      http: {path: '/', verb: 'get'},
      accepts: [
        {arg: 'limit', type: 'number'},
        {arg: 'offset', type: 'number'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'object'}]
    }
  )

  BieuNhapLieu.getOneBieuNhapLieu = async function(id) {
    const BieuNhapLieuModel = app.models.BieuNhapLieu;
    let bieuNhapLieu;
    try {
      bieuNhapLieu = await BieuNhapLieuModel.findOne({where: {id, xoa: 0}});
      if(!bieuNhapLieu) {
        return [HttpStatus.NOT_FOUND, `Not found bieu_nhap_lieu id ${id}`];
      }
      return [HttpStatus.OK, bieuNhapLieu];
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
  }

  BieuNhapLieu.remoteMethod(
    'getOneBieuNhapLieu', {
      http: {path: '/:id', verb: 'get'},
      accepts: [
        {arg: 'id', type: 'number'},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'object'}]
    }
  )

  BieuNhapLieu.deleteBieuNhapLieu = async function(id) {
    const BieuNhapLieuModel = app.models.BieuNhapLieu;
    try {
      bieuNhapLieu = await BieuNhapLieuModel.findOne({where: {id: id, xoa: 0}, fields: {id: 1}});
      if(!bieuNhapLieu) {
        return [HttpStatus.NOT_FOUND, `Not found bieu_nhap_lieu id ${id}`];
      }
      await BieuNhapLieuModel.updateAll({id: id}, {xoa: 1});
      return [HttpStatus.OK, `Deleted bieu_nhap_lieu id ${id}`];
    } catch(err) {
      console.log(err);
      // TODO: this is for debug, change this for product
      return [HttpStatus.INTERNAL_SERVER_ERROR, err]
    }
  }

  BieuNhapLieu.remoteMethod(
    'deleteBieuNhapLieu', {
      http: {path: '/:id', verb: 'delete'},
      accepts: [
        {arg: 'id', type: 'number', required: true},
      ],
      returns: [{arg: 'status', type: 'number'}, {arg: 'message', type: 'string'}]
    }
  )
}
