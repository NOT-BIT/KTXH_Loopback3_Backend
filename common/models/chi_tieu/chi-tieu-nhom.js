module.exports = function(ChiTieuNhom) {
  const Promise = require('bluebird')

  ChiTieuNhom.listChiTieuNhom = async function(page, pageSize, queryData) {
    try {
      const [data, total] = await Promise.all([
        ChiTieuNhom.find({
          where: {
            xoa: 0
          },
          fields: {
            ma: true,
            ten: true,
            ghiChu: true,
            hieuLuc: true
          }
        }),
        ChiTieuNhom.count({
          xoa: false
        })
      ])

      return {
        rows: data,
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
      const [data, total] = await Promise.all([
        ChiTieuNhom.find({
          where: {
            xoa: 0
          },
          fields: {
            ma: true,
            ten: true,
            ghiChu: true,
            hieuLuc: true
          }
        }),
        ChiTieuNhom.count({
          xoa: true
        })
      ])

      return {
        rows: data,
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
      const data = await ChiTieuNhom.findById(id, {
        where: {
          xoa: false
        }
      })
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
      createdBy: 0
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
    ghiChu
  ) {
    const chiTieuNhom = {
      id: id,
      ma: ma,
      ten: ten,
      ghiChu: ghiChu,
      updatedAt: new Date(),
      updatedBy: 0
    }

    try {
      const data = await ChiTieuNhom.upsertWithWhere(
        {
          id: chiTieuNhom.id
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
