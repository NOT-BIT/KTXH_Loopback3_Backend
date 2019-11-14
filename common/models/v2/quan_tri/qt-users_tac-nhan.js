let customCRUD = require('../../../utils/custom-crud')
let app = require('../../../../server/server')

'use_strict';

module.exports = function (ThisModel) {
  //create Bieu Nhap Lieu Chi Tieu
  ThisModel.customCreate = async function (uid, ma, ten, qtUsersId, qtTacNhanId, ghiChu) {
    const queryData = {
      uid: uid,
      ma: ma,
      ten: ten,
      qtUsersId: qtUsersId,
      qtTacNhanId: qtTacNhanId,
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
  ThisModel.customUpdate = async function (id, ma, ten, qtUsersId, qtTacNhanId, ghiChu, hieuLuc) {
    const queryData = {
      id: id,
      ma: ma,
      ten: ten,
      qtUsersId: qtUsersId,
      qtTacNhanId: qtTacNhanId,
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

  //
  ThisModel.newUpdate = async function(uid, ma, qtUsersId, listTNid){
    let i,j,k
    oldList = await ThisModel.find({where: {qtUsersId: qtUsersId}})
    oldList.sort((a, b) => (a.qtTacNhanId > b.qtTacNhanId) ? 1 : -1)
    listTNid.sort()
    i = 0
    j = 0
    while (listTNid[i] != null & oldList[j] != null){
      if (listTNid[i] < oldList[j].qtTacNhanId){
        await ThisModel.customCreate(uid+i, ma+i, "", qtUsersId, listTNid[i], "")
        i += 1 
      }
      else if (listTNid[i] > oldList[j].qtTacNhanId){
        await ThisModel.destroyById(oldList[j].id)
        j += 1
      }
      else{
        i += 1
        j += 1
      }
    }
    if (i < listTNid.length){
      for (k = i; k < listTNid.length; k++){
       await ThisModel.customCreate(uid+k, ma+k, "", qtUsersId, listTNid[k], "")
      }
    }
    if (j <= oldList.length){
      for (k = j; k < oldList.length; k++){
        await ThisModel.destroyById(oldList[k].id)
      }
    }
    return  await ThisModel.find({where: {qtUsersId: qtUsersId }})
  }
 

  ThisModel.remoteMethod('customCreate',
    {
      http: { path: '/create', verb: 'post' },
      accepts: [
        { arg: 'uid', type: 'string', required: true },
        { arg: 'ma', type: 'string', required: true },
        { arg: 'ten', type: 'string' },
        { arg: 'qtUsersId', type: 'number', required: true },
        { arg: 'qtTacNhanId', type: 'number', required: true },
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
        { arg: 'qtUsersId', type: 'number' },
        { arg: 'qtTacNhanId', type: 'number' },
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

  ThisModel.remoteMethod('newUpdate',
    {
      http: { path: '/newUpdate', verb: 'post' },
      accepts: [
        { arg: 'uid', type: 'string', required: true },
        { arg: 'ma', type: 'string', required: true },
        { arg: 'qtUsersId', type: 'number', required: true },
        { arg: 'listTNid', type: 'array', required: true }
      ],
      returns: {arg: 'data', type: 'object', root: true}
    }
  )
};