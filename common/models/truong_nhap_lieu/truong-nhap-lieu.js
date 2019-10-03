module.exports = function(TruongNhapLieu) {
  const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

  TruongNhapLieu.listTruongNhapLieu = async function(
    page,
    pageSize,
    queryData
  ) {
    try {
      queryData.xoa = 0
      const [data, total] = await Promise.all([
        TruongNhapLieu.find({
          where: {queryData},
          include: ['belongsToSysLoaiTruongNhapLieu']
        }),
        TruongNhapLieu.count({
          xoa: false
        })
      ])

      return {
        rows: queryObject.listAPIReturnsList(TruongNhapLieu, data),
        page: page,
        pageSize: pageSize,
        total: total
      }
    } catch (err) {
      console.log('listTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.deletedListTruongNhapLieu = async function(
    page,
    pageSize,
    queryData
  ) {
    try {
      queryData.xoa = 1
      const [data, total] = await Promise.all([
        TruongNhapLieu.find({
          where: {queryData},
          include: ['belongsToSysLoaiTruongNhapLieu']
        }),
        TruongNhapLieu.count({
          xoa: true
        })
      ])

      return {
        rows: queryObject.listAPIReturnsList(TruongNhapLieu, data),
        page: page,
        pageSize: pageSize,
        total: total
      }
    } catch (err) {
      console.log('deletedListTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.readTruongNhapLieu = async function(id) {
    try {
      const data = await TruongNhapLieu.findOne({where: {id: id, xoa: false}})
      return data
    } catch (err) {
      console.log('readTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.createTruongNhapLieu = async function(
    uid,
    ma,
    ten,
    donViTinh,
    ghiChu,
    sysLoaiTruongNhapLieuId
  ) {
    const truongNhapLieu = {
      uid: uid,
      ma: ma,
      ten: ten,
      donViTinh: donViTinh,
      ghiChu: ghiChu,
      hieuLuc: 1,
      xoa: 0,
      createdAt: new Date(),
      createdBy: 0,
      sysLoaiTruongNhapLieuId: sysLoaiTruongNhapLieuId
    }

    try {
      const data = await TruongNhapLieu.create(truongNhapLieu)
      return data
    } catch (err) {
      console.log('createTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.updateTruongNhapLieu = async function(
    id,
    ma,
    ten,
    donViTinh,
    ghiChu,
    sysLoaiTruongNhapLieuId,
    hieuLuc
  ) {
    const truongNhapLieu = {
      id: id,
      ma: ma,
      ten: ten,
      ghiChu: ghiChu,
      donViTinh: donViTinh,
      ghiChu: ghiChu,
      hieuLuc: hieuLuc,
      sysLoaiTruongNhapLieuId: sysLoaiTruongNhapLieuId,
      updatedAt: new Date(),
      updatedBy: 0
    }

    try {
      const data = await TruongNhapLieu.upsertWithWhere(
        {
          id: truongNhapLieu.id,
          xoa: false
        },
        truongNhapLieu
      )
      return data
    } catch (err) {
      console.log('updateTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.deleteTruongNhapLieu = async function(id) {
    try {
      const data = await TruongNhapLieu.upsertWithWhere(
        {
          id: id
        },
        { xoa: true }
      )
      return data
    } catch (err) {
      console.log('deleteTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.reStoreTruongNhapLieu = async function(id) {
    try {
      const data = await TruongNhapLieu.upsertWithWhere(
        {
          id: id
        },
        {
          xoa: false
        }
      )
      return data
    } catch (err) {
      console.log('reStoreTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.remoteMethod('listTruongNhapLieu', {
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

  TruongNhapLieu.remoteMethod('deletedListTruongNhapLieu', {
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

  TruongNhapLieu.remoteMethod('readTruongNhapLieu', {
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

  TruongNhapLieu.remoteMethod('createTruongNhapLieu', {
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
        arg: 'donViTinh',
        type: 'string'
      },
      {
        arg: 'ghiChu',
        type: 'string'
      },
      {
        arg: 'sysLoaiTruongNhapLieuId',
        type: 'string',
        required: true
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/create' }
  })

  TruongNhapLieu.remoteMethod('updateTruongNhapLieu', {
    accepts: [
      {
        arg: 'id',
        type: 'number',
        required: true
      },
      {
        arg: 'ten',
        type: 'string'
      },
      {
        arg: 'ma',
        type: 'string'
      },
      {
        arg: 'donViTinh',
        type: 'string'
      },
      {
        arg: 'noiDung',
        type: 'string'
      },
      {
        arg: 'sysLoaiTruongNhapLieuId',
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

  TruongNhapLieu.remoteMethod('deleteTruongNhapLieu', {
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

  TruongNhapLieu.remoteMethod('reStoreTruongNhapLieu', {
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
