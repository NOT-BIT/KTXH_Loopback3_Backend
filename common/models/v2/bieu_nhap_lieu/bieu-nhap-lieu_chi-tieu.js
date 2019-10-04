let to = require('await-to-js').to;

'use_strict';

module.exports = function (BieuNhapLieu_ChiTieu) {
  const Promise = require('bluebird')
  let queryObject = require("../../utils/query-object")
  //create Bieu Nhap Lieu Chi Tieu
  BieuNhapLieu_ChiTieu.createBieuNhapLieu_ChiTieu = async function (
    uid,
    ma,
    ten,
    bieuNhapLieuId,
    chiTieuId,
    ghiChu
  ) {

    const bnlChiTieuData = {
      uid: uid,
      ma: ma,
      ten: ten,
      bieuNhapLieuId: bieuNhapLieuId,
      chiTieuId: chiTieuId,
      ghiChu: ghiChu,
      createdAt: new Date(),
      createdBy: 0
    }
    try {
      const data = await BieuNhapLieu_ChiTieu.create(bnlChiTieuData)
      return data
    } catch (err) {
      console.log('create Bieu-Nhap-Lieu-Chi-Tieu', err)
      throw err
    }
  }

  //read Bieu Nhap Lieu Chi Tieu
  BieuNhapLieu_ChiTieu.readBieuNhapLieu_ChiTieu = async function (id) {
    try {
      const data = await BieuNhapLieu_ChiTieu.findOne({
        where: {
          id: id,
          xoa: 0
        }
      });
      return data;
    } catch (err) {
      console.log('read Bieu-Nhap-Lieu-Chi-Tieu', err)
      throw err
    }
  }

  //update Bieu Nhap Lieu Chi Tieu
  BieuNhapLieu_ChiTieu.updateBieuNhapLieu_ChiTieu = async function (
    id,
    ma,
    ten,
    bieuNhapLieuId,
    chiTieuId,
    ghiChu,
    hieuLuc
  ) {

    const bnlChiTieuData = {
      id: id,
      ma: ma,
      ten: ten,
      bieuNhapLieuId: bieuNhapLieuId,
      chiTieuId: chiTieuId,
      ghiChu: ghiChu,
      hieuLuc: hieuLuc,
      updatedAt: new Date(),
      updatedBy: 0
    }
    try {
      const data = await BieuNhapLieu_ChiTieu.upsertWithWhere(
        {
          id: BieuNhapLieu_ChiTieu.id,
          xoa: false
        },
        bnlChiTieuData
      )
      return data
    } catch (err) {
      console.log('update Bieu-Nhap-Lieu-Chi-Tieu', err)
      throw err
    }
  }

  //delete Bieu Nhap Lieu Chi Tieu 
  BieuNhapLieu_ChiTieu.deleteBieuNhapLieu_ChiTieu = async function (id) {
    try {
      const data = await BieuNhapLieu_ChiTieu.upsertWithWhere(
        {
          id: id
        },
        { xoa: 1 }
      )
      return data
    } catch (err) {
      console.log('delete Bieu-Nhap-Lieu-Chi-Tieu', err)
      throw err
    }
  }

  // Restore Bieu Nhap Lieu Chi Tieu
  BieuNhapLieu_ChiTieu.restoreBieuNhapLieu_ChiTieu = async function (id) {
    try {
      const data = await BieuNhapLieu_ChiTieu.upsertWithWhere(
        {
          id: id
        },
        { xoa: 0 }
      )
      return data
    } catch (err) {
      console.log('restore Bieu-Nhap-Lieu-Chi-Tieu', err)
      throw err
    }

  }

  //list Bieu Nhap Lieu Chi Tieu
  BieuNhapLieu_ChiTieu.listBieuNhapLieu_ChiTieu = async function (queryData, page, pageSize) {
    try {
      queryData.xoa = 0
      const [data, total] = await Promise.all([
        BieuNhapLieu_ChiTieu.find({
          where: { queryData },
          include: ['belongsToBieuNhapLieu', 'belongsToChiTieu']
        }),
        BieuNhapLieu_ChiTieu.count({
          xoa: 0
        })
      ])

      return {
        rows: queryObject.listAPIReturnsList(BieuNhapLieu_ChiTieu, data),
        page: page,
        pageSize: pageSize,
        total: total
      }
    } catch (err) {
      console.log('list Bieu-Nhap-Lieu-Chi-Tieu', err)
      throw err
    }
  }

  //list deleted Bieu Nhap Lieu Chi Tieu
  BieuNhapLieu_ChiTieu.listDeleteBieuNhapLieu_ChiTieu = async function (queryData, page, pageSize) {
    try {
      queryData.xoa = 1
      const [data, total] = await Promise.all([
        BieuNhapLieu_ChiTieu.find({
          where: { queryData },
          include: ['belongsToBieuNhapLieu', 'belongsToChiTieu']
        }),
        BieuNhapLieu_ChiTieu.count({
          xoa: 1
        })
      ])

      return {
        rows: queryObject.listAPIReturnsList(BieuNhapLieu_ChiTieu, data),
        page: page,
        pageSize: pageSize,
        total: total
      }
    } catch (err) {
      console.log('list delete Bieu-Nhap-Lieu-Chi-Tieu', err)
      throw err
    }
  }

  BieuNhapLieu_ChiTieu.remoteMethod('createBieuNhapLieu_ChiTieu',
    {
      http: { path: '/create', verb: 'post' },
      accepts: [
        { arg: 'uid', type: 'string', required: true },
        { arg: 'ma', type: 'string', required: true },
        { arg: 'ten', type: 'string' },
        { arg: 'bieuNhapLieuId', type: 'number', required: true },
        { arg: 'chiTieuId', type: 'number', required: true },
        { arg: 'ghiChu', type: 'string' }
      ],
      returns: { arg: 'data' },
    }
  )

  BieuNhapLieu_ChiTieu.remoteMethod('readBieuNhapLieu_ChiTieu',
    {
      http: { path: '/read', verb: 'post' },
      accepts: [
        { arg: 'id', type: 'number', required: true }],
      returns: { arg: 'data' }
    },
  )

  BieuNhapLieu_ChiTieu.remoteMethod('updateBieuNhapLieu_ChiTieu',
    {
      http: { path: '/update', verb: 'post' },
      accepts: [
        { arg: 'id', type: 'number', required: true },
        { arg: 'ma', type: 'string' },
        { arg: 'ten', type: 'string' },
        { arg: 'bieuNhapLieuId', type: 'number' },
        { arg: 'chiTieuId', type: 'number' },
        { arg: 'ghiChu', type: 'string' },
        { arg: 'hieuLuc', type: 'boolean' }
      ],
      returns: { arg: 'data' },
    },
  )

  BieuNhapLieu_ChiTieu.remoteMethod('deleteBieuNhapLieu_ChiTieu',
    {
      http: { path: '/delete', verb: 'post' },
      accepts: [
        { arg: 'id', type: 'number', required: true }
      ],
      returns: { arg: 'data' }
    },
  )

  BieuNhapLieu_ChiTieu.remoteMethod('restoreBieuNhapLieu_ChiTieu',
    {
      http: { path: '/restore', verb: 'post' },
      accepts: [
        { arg: 'id', type: 'number', required: true }
      ],
      returns: { arg: 'data' }
    },
  )

  BieuNhapLieu_ChiTieu.remoteMethod('listBieuNhapLieu_ChiTieu',
    {
      http: { verb: 'post', path: '/list' },
      accepts: [
        { arg: 'queryData', type: 'object' },
        { arg: 'page', type: 'number', default: '0' },
        { arg: 'pageSize', type: 'number', default: '20' }],
      returns: { arg: 'data' }
    })

  BieuNhapLieu_ChiTieu.remoteMethod('listDeleteBieuNhapLieu_ChiTieu',
    {
      http: { verb: 'post', path: '/deleted_list' },
      accepts: [
        { arg: 'queryData', type: 'object' },
        { arg: 'page', type: 'number', default: '0' },
        { arg: 'pageSize', type: 'number', default: '20' }],
      returns: { arg: 'data' }
    })


};