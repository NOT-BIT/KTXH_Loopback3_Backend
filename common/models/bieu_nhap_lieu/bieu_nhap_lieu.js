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


}
