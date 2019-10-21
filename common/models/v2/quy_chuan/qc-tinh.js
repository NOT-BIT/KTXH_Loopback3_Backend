let customCRUD = require('../../../utils/custom-crud')
let app = require('../../../../server/server')

'use_strict';

module.exports = function (ThisModel) {
  //create Bieu Nhap Lieu Chi Tieu
  ThisModel.customCreate = async function (uid, ma, ten, sysCapDonViHanhChinhId, loaiDonViHanhChinh, nongThon, bienGioi, haiDao, vungDBKhoKhan, ghiChu) {
    const queryData = {
      uid: uid,
      ma: ma,
      ten: ten,
      sysCapDonViHanhChinhId: sysCapDonViHanhChinhId,
      loaiDonViHanhChinh: loaiDonViHanhChinh,
      nongThon: nongThon,
      bienGioi: bienGioi,
      haiDao, haiDao,
      vungDBKhoKhan: vungDBKhoKhan,
      ghiChu: ghiChu,
      createdAt: new Date(),
      createdBy: 0
    }
    return await customCRUD.create(ThisModel, queryData)
  }

  //list Bieu Nhap Lieu Chi Tieu
  ThisModel.customList = async function (queryData, page, pageSize) {
    return await customCRUD.list(ThisModel, queryData, page, pageSize)
  }

  //list deleted Bieu Nhap Lieu Chi Tieu
  ThisModel.customListDeleted = async function (queryData, page, pageSize) {
    return await customCRUD.listDeleted(ThisModel, queryData, page, pageSize)
  }

  //read Bieu Nhap Lieu Chi Tieu
  ThisModel.customRead = async function (id) {
    return await customCRUD.read(ThisModel, id)
  }

  //update Bieu Nhap Lieu Chi Tieu
  ThisModel.customUpdate = async function (id, ma, ten, sysCapDonViHanhChinhId, loaiDonViHanhChinh, nongThon, bienGioi, haiDao, vungDBKhoKhan, ghiChu, hieuLuc) {
    const queryData = {
      id: id,
      ma: ma,
      ten: ten,
      sysCapDonViHanhChinhId: sysCapDonViHanhChinhId,
      loaiDonViHanhChinh: loaiDonViHanhChinh,
      nongThon: nongThon,
      bienGioi: bienGioi,
      haiDao, haiDao,
      vungDBKhoKhan: vungDBKhoKhan,
      ghiChu: ghiChu,
      hieuLuc: hieuLuc,
      updatedAt: new Date(),
      updatedBy: 0
    }
    return await customCRUD.update(ThisModel, queryData)
  }

  //delete Bieu Nhap Lieu Chi Tieu 
  ThisModel.customDelete = async function (id) {
    return await customCRUD.delete(ThisModel, id)
  }

  // Restore Bieu Nhap Lieu Chi Tieu
  ThisModel.customRestore = async function (id) {
    return await customCRUD.restore(ThisModel, id)
  }

  ThisModel.remoteMethod('customCreate',
    {
      http: { path: '/create', verb: 'post' },
      accepts: [
        { arg: 'uid', type: 'string', required: true },
        { arg: 'ma', type: 'string', required: true },
        { arg: 'ten', type: 'string' },
        { arg: 'sysCapDonViHanhChinh', type: 'number', required: true },
        { arg: 'loaiDonViHanhChinh', type: 'string', required: true },
        { arg: 'nongThon', 'type': 'boolean' },
        { arg: 'bienGioi', type: 'boolean' },
        { arg: 'haiDao', type: 'boolean' },
        { arg: 'vungDBKhoKhan', type: 'boolean' },
        { arg: 'ghiChu', type: 'string' }
      ],
      returns: {arg: 'data', type: 'object', root: true}
    }
  )

  ThisModel.remoteMethod('customList',
    {
      http: { verb: 'post', path: '/list' },
      accepts: [
        { arg: 'queryData', type: 'object' },
        { arg: 'page', type: 'number', default: '0' },
        { arg: 'pageSize', type: 'number', default: '20' }],
      returns: {arg: 'data', type: 'object', root: true}
    })

    ThisModel.remoteMethod('customListDeleted',
    {
      http: { verb: 'post', path: '/list_deleted' },
      accepts: [
        { arg: 'queryData', type: 'object' },
        { arg: 'page', type: 'number', default: '0' },
        { arg: 'pageSize', type: 'number', default: '20' }],
      returns: {arg: 'data', type: 'object', root: true}
    })

  ThisModel.remoteMethod('customRead',
    {
      http: { path: '/read', verb: 'post' },
      accepts: [
        { arg: 'id', type: 'number', required: true }],
      returns: {arg: 'data', type: 'object', root: true}
    },
  )

  ThisModel.remoteMethod('customUpdate',
    {
      http: { path: '/update', verb: 'post' },
      accepts: [
        { arg: 'id', type: 'number', required: true },
        { arg: 'ma', type: 'string' },
        { arg: 'ten', type: 'string' },
        { arg: 'qcTinhId', type: 'number' },
        { arg: 'sysCapDonViHanhChinh', type: 'number' },
        { arg: 'loaiDonViHanhChinh', type: 'string' },
        { arg: 'nongThon', 'type': 'boolean' },
        { arg: 'bienGioi', type: 'boolean' },
        { arg: 'haiDao', type: 'boolean' },
        { arg: 'vungDBKhoKhan', type: 'boolean' },
        { arg: 'ghiChu', type: 'string' },
        { arg: 'hieuLuc', type: 'boolean' }
      ],
      returns: {arg: 'data', type: 'object', root: true}
    },
  )

  ThisModel.remoteMethod('customDelete',
    {
      http: { path: '/delete', verb: 'post' },
      accepts: [
        { arg: 'id', type: ['number'], required: true }
      ],
      returns: {arg: 'data', type: 'object', root: true}
    },
  )

  ThisModel.remoteMethod('customRestore',
    {
      http: { path: '/restore', verb: 'post' },
      accepts: [
        { arg: 'id', type: ['number'], required: true }
      ],
      returns: {arg: 'data', type: 'object', root: true}
    },
  )
};