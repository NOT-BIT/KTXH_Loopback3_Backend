module.exports = function(ChiTieuNhom) {
  const Promise = require('bluebird')

  ChiTieuNhom.listChiTieuNhom = async function(page, pageSize, deleted) {
    try {
      const [data, total] = await Promise.all([
        ChiTieuNhom.find({
          where: {
            xoa: 0
          },
          fields: {
            ten: true,
            noidung: true
          }
        }),
        ChiTieuNhom.count({
          xoa: deleted
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
    ten,
    ghiChu,
    ma,
    noiDung,
    createdBy
  ) {
    const chiTieuNhom = {
      uid: uid,
      ten: ten,
      ghiChu: ghiChu,
      ma: ma,
      noiDung: noiDung,
      createdAt: new Date(),
      createdBy: createdBy
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
    ten,
    ghiChu,
    ma,
    noiDung,
    updatedBy
  ) {
    const chiTieuNhom = {
      id: id,
      ten: ten,
      ghiChu: ghiChu,
      ma: ma,
      noiDung: noiDung,
      updatedAt: new Date(),
      updatedBy: updatedBy
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

  ChiTieuNhom.deleteChiTieuNhom = async function(id, deleted) {
    try {
      const data = await ChiTieuNhom.upsertWithWhere(
        {
          id: id
        },
        { xoa: deleted }
      )
      return data
    } catch (err) {
      console.log('deleteChiTieuNhom', err)
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
        arg: 'deleted',
        type: 'boolean',
        default: false
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'get', path: '/list' }
  })

  ChiTieuNhom.remoteMethod('readChiTieuNhom', {
    accepts: [
      {
        arg: 'id',
        type: 'number',
        require: true
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
        require: true
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
        arg: 'ma',
        type: 'string'
      },
      {
        arg: 'noiDung',
        type: 'string'
      },
      {
        arg: 'createdBy',
        type: 'number',
        require: true
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
        require: true
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
        arg: 'ma',
        type: 'string'
      },
      {
        arg: 'noiDung',
        type: 'string'
      },
      {
        arg: 'updatedBy',
        type: 'number',
        require: true
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
        require: true
      },
      {
        arg: 'deleted',
        type: 'boolean',
        default: true
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/delete' }
  })
}
