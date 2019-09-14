module.exports = function(TruongNhapLieu) {
  const Promise = require('bluebird')

  TruongNhapLieu.listTruongNhapLieu = async function(page, pageSize, deleted) {
    try {
      const [data, total] = await Promise.all([
        TruongNhapLieu.find({
          where: {
            xoa: 0
          },
          fields: {
            ten: true,
            noidung: true
          }
        }),
        TruongNhapLieu.count({
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
      console.log('listTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.readTruongNhapLieu = async function(id) {
    try {
      const data = await TruongNhapLieu.findById(id, {
        where: {
          xoa: false
        }
      })
      return data
    } catch (err) {
      console.log('readTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.createTruongNhapLieu = async function(
    uid,
    ten,
    ma,
    donViTinh,
    noiDung,
    createdBy,
    sysLoaiTruongNhapLieuId
  ) {
    const truongNhapLieu = {
      uid: uid,
      ten: ten,
      ma: ma,
      donViTinh: donViTinh,
      noiDung: noiDung,
      createdAt: new Date(),
      createdBy: createdBy,
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
    ten,
    ma,
    donViTinh,
    noiDung,
    sysLoaiTruongNhapLieuId,
    updatedBy
  ) {
    const truongNhapLieu = {
      id: id,
      ten: ten,
      ghiChu: ghiChu,
      ma: ma,
      donViTinh: donViTinh,
      noiDung: noiDung,
      sysLoaiTruongNhapLieuId: sysLoaiTruongNhapLieuId,
      updatedAt: new Date(),
      updatedBy: updatedBy
    }

    try {
      const data = await TruongNhapLieu.upsertWithWhere(
        {
          id: truongNhapLieu.id
        },
        truongNhapLieu
      )
      return data
    } catch (err) {
      console.log('updateTruongNhapLieu', err)
      throw err
    }
  }

  TruongNhapLieu.deleteTruongNhapLieu = async function(id, deleted) {
    try {
      const data = await TruongNhapLieu.upsertWithWhere(
        {
          id: id
        },
        { xoa: deleted }
      )
      return data
    } catch (err) {
      console.log('deleteTruongNhapLieu', err)
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
        arg: 'deleted',
        type: 'boolean',
        default: false
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'get', path: '/list' }
  })

  TruongNhapLieu.remoteMethod('readTruongNhapLieu', {
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

  TruongNhapLieu.remoteMethod('createTruongNhapLieu', {
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
        type: 'string',
        require: true
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

  TruongNhapLieu.remoteMethod('updateTruongNhapLieu', {
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
        arg: 'updatedBy',
        type: 'number',
        require: true
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
