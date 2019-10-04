module.exports = function(ChiTieuNhom) {
  const Promise = require('bluebird')
  let queryObject = require("../../utils/query-object")

  ChiTieuNhom.listChiTieuNhom = async function(page, pageSize, queryData) {
    try {
      queryData.xoa = 0
      const [data, total] = await Promise.all([
        ChiTieuNhom.find({
          where: {queryData},
        }),
        ChiTieuNhom.count({
          xoa: false
        })
      ])

      return {
        rows: queryObject.listAPIReturnsList(ChiTieuNhom, data),
        page: page,
        pageSize: pageSize,
        total: total
      }
    } catch (err) {
      console.log('listChiTieuNhom', err)
      throw err
    }
  }

  ChiTieuNhom.deletedListChiTieuNhom = async function(
    page,
    pageSize,
    queryData
  ) {
    try {
      queryData.xoa = 1
      const [data, total] = await Promise.all([
        ChiTieuNhom.find({
          where: {queryData}
        }),
        ChiTieuNhom.count({
          xoa: true
        })
      ])

      return {
        rows: queryObject.listAPIReturnsList(ChiTieuNhom, data),
        page: page,
        pageSize: pageSize,
        total: total
      }
    } catch (err) {
      console.log('deletedListChiTieuNhom', err)
      throw err
    }
  }

  ChiTieuNhom.readChiTieuNhom = async function(id) {
    try {
      const data = await ChiTieuNhom.findOne({where: {id: id, xoa: false}})
      return data
    } catch (err) {
      console.log('readChiTieuNhom', err)
      throw err
    }
  }

  ChiTieuNhom.createChiTieuNhom = async function(
    uid,
    ma,
    ten,
    ghiChu
  ) {
    const chiTieuNhom = {
      uid: uid,
      ma: ma,
      ten: ten,
      ghiChu: ghiChu,
      createdAt: new Date(),
      createdBy: 0,
      hieuLuc: 1,
      xoa: 0
    }

    try {
      const data = await ChiTieuNhom.create(chiTieuNhom)
      return data
    } catch (err) {
      console.log('createChiTieuNhom', err)
      throw err
    }
  }

  ChiTieuNhom.updateChiTieuNhom = async function(
    id,
    ma,
    ten,
    ghiChu,
    hieuLuc
  ) {
    const chiTieuNhom = {
      id: id,
      ma: ma,
      ten: ten,
      ghiChu: ghiChu,
      updatedAt: new Date(),
      updatedBy: 0, 
      hieuLuc: hieuLuc
    }

    try {
      const data = await ChiTieuNhom.upsertWithWhere(
        {
          id: chiTieuNhom.id,
          xoa: false
        },
        chiTieuNhom
      )
      return data
    } catch (err) {
      console.log('updateChiTieuNhom', err)
      throw err
    }
  }

  ChiTieuNhom.deleteChiTieuNhom = async function(id) {
    try {
      const data = await ChiTieuNhom.upsertWithWhere(
        {
          id: id
        },
        { xoa: true }
      )
      return data
    } catch (err) {
      console.log('deleteChiTieuNhom', err)
      throw err
    }
  }

  ChiTieuNhom.reStoreChiTieuNhom = async function(id) {
    try {
      const data = await ChiTieuNhom.upsertWithWhere(
        {
          id: id
        },
        {
          xoa: false
        }
      )
      return data
    } catch (err) {
      console.log('reStoreChiTieuNhom', err)
      throw err
    }
  }

  ChiTieuNhom.remoteMethod('listChiTieuNhom', {
    accepts: [
      {
        arg: 'page',
        type: 'number',
        default: '0'
      },
      {
        arg: 'pageSize',
        type: 'number',
        default: '20'
      },
      {
        arg: 'queryData',
        type: 'object'
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/list' }
  })

  ChiTieuNhom.remoteMethod('deletedListChiTieuNhom', {
    accepts: [
      {
        arg: 'page',
        type: 'number',
        default: '0'
      },
      {
        arg: 'pageSize',
        type: 'number',
        default: '20'
      },
      {
        arg: 'queryData',
        type: 'object'
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/deleted-list' }
  })

  ChiTieuNhom.remoteMethod('readChiTieuNhom', {
    accepts: [
      {
        arg: 'id',
        type: 'number',
        required: true
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'get', path: '/read' }
  })

  ChiTieuNhom.remoteMethod('createChiTieuNhom', {
    accepts: [
      {
        arg: 'uid',
        type: 'string',
        required: true
      },
      {
        arg: 'ma',
        type: 'string',
        required: true
      },
      {
        arg: 'ten',
        type: 'string'
      },
      {
        arg: 'ghiChu',
        type: 'string'
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/create' }
  })

  ChiTieuNhom.remoteMethod('updateChiTieuNhom', {
    accepts: [
      {
        arg: 'id',
        type: 'number',
        required: true
      },
      {
        arg: 'ma',
        type: 'string'
      },
      {
        arg: 'ten',
        type: 'string'
      },
      {
        arg: 'ghiChu',
        type: 'string'
      },
      {
        arg: 'hieuLuc',
        type: 'boolean'
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/update' }
  })

  ChiTieuNhom.remoteMethod('deleteChiTieuNhom', {
    accepts: [
      {
        arg: 'id',
        type: 'number',
        required: true
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/delete' }
  })

  ChiTieuNhom.remoteMethod('reStoreChiTieuNhom', {
    accepts: [
      {
        arg: 'id',
        type: 'number',
        required: true
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/restore' }
  })
}
