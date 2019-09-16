module.exports = function(QLKyBaoCao) {
  const Promise = require('bluebird')

  QLKyBaoCao.listKyBaoCao = async function(
    page,
    pageSize,
    ma,
    ten,
    ngayBatDau,
    ngayBaoCaoHuyen,
    ngayBaoCaoTinh,
    ngayBaoCaoTW,
    ngayDong,
    ngayMo,
    ngayTongHop,
    ghiChu,
    qlNamLamViecId,
    sysKyBaoCaoId,
    sysTrangThaiDongMoId
  ) {
    try {
      const [data, total] = await Promise.all([
        QLKyBaoCao.find({
          where: {
            xoa: false
          },
          fields: {
            ma: true,
            ten: true,
            ghiChu: true,
            ngayDong: true,
            ngayMo: true,
            sysKyBaoCaoId: true,
            qtNamLamViecId: true
          },
          include: ['SysKyBaoCao', 'QTNamLamViec', 'SysTrangThaiDongMo'],
          limit: pageSize,
          skip: page
        }),
        QLKyBaoCao.count({
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
      console.log('listKyBaoCao', err)
      throw err
    }
  }

  QLKyBaoCao.deletedListKyBaoCao = async function(
    page,
    pageSize,
    ma,
    ten,
    ngayBatDau,
    ngayBaoCaoHuyen,
    ngayBaoCaoTinh,
    ngayBaoCaoTW,
    ngayDong,
    ngayMo,
    ngayTongHop,
    ghiChu,
    qlNamLamViecId,
    sysKyBaoCaoId,
    sysTrangThaiDongMoId
  ) {
    try {
      const [data, total] = await Promise.all([
        QLKyBaoCao.find({
          where: {
            xoa: false
          },
          fields: {
            ten: true,
            ghiChu: true
          },
          limit: pageSize,
          skip: page
        }),
        QLKyBaoCao.count({
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
      console.log('deletedListKyBaoCao', err)
      throw err
    }
  }

  QLKyBaoCao.readKyBaoCao = async function(id) {
    try {
      const data = await QLKyBaoCao.findById(id, {
        where: {
          xoa: false
        }
      })
      return data
    } catch (err) {
      console.log('readBaoCaoBy', err)
      throw err
    }
  }

  QLKyBaoCao.createKyBaoCao = async function(
    uid,
    ma,
    ten,
    ngayBatDau,
    ngayBaoCaoHuyen,
    ngayBaoCaoTinh,
    ngayBaoCaoTW,
    ngayDong,
    ngayMo,
    ngayTongHop,
    ghiChu,
    createdBy,
    qlNamLamViecId,
    sysKyBaoCaoId,
    sysTrangThaiDongMoId
  ) {
    const qlKyBaoCao = {
      uid: uid,
      ma: ma,
      ten: ten,
      ngayBatDau: ngayBatDau,
      ngayBaoCaoHuyen: ngayBaoCaoHuyen,
      ngayBaoCaoTinh: ngayBaoCaoTinh,
      ngayBaoCaoTW: ngayBaoCaoTW,
      ngayDong: ngayDong,
      ngayMo: ngayMo,
      ngayTongHop: ngayTongHop,
      ghiChu: ghiChu,
      createdAt: new Date(),
      createdBy: createdBy,
      qlNamLamViecId: qlNamLamViecId,
      sysKyBaoCaoId: sysKyBaoCaoId,
      sysTrangThaiDongMoId: sysTrangThaiDongMoId
    }

    try {
      const data = await QLKyBaoCao.create(qlKyBaoCao)
      return data
    } catch (err) {
      console.log('createKyBaoCao', err)
      throw err
    }
  }

  QLKyBaoCao.updateKyBaoCao = async function(
    id,
    ma,
    ten,
    ngayBatDau,
    ngayBaoCaoHuyen,
    ngayBaoCaoTinh,
    ngayBaoCaoTW,
    ngayDong,
    ngayMo,
    ngayTongHop,
    ghiChu,
    updatedBy,
    qlNamLamViecId,
    sysKyBaoCaoId,
    sysTrangThaiDongMoId
  ) {
    const qlKyBaoCao = {
      id: id,
      ma: ma,
      ten: ten,
      ngayBatDau: ngayBatDau,
      ngayBaoCaoHuyen: ngayBaoCaoHuyen,
      ngayBaoCaoTinh: ngayBaoCaoTinh,
      ngayBaoCaoTW: ngayBaoCaoTW,
      ngayDong: ngayDong,
      ngayMo: ngayMo,
      ngayTongHop: ngayTongHop,
      ghiChu: ghiChu,
      updatedAt: new Date(),
      updatedBy: updatedBy,
      qlNamLamViecId: qlNamLamViecId,
      sysKyBaoCaoId: sysKyBaoCaoId,
      sysTrangThaiDongMoId: sysTrangThaiDongMoId
    }

    try {
      const data = await QLKyBaoCao.upsertWithWhere({ id: id }, qlKyBaoCao)

      return data
    } catch (err) {
      console.log('updateKyBaoCao', err)
      throw err
    }
  }

  QLKyBaoCao.deleteKyBaoCao = async function(id) {
    try {
      const data = await QLKyBaoCao.upsertWithWhere(
        {
          id: id
        },
        { xoa: true }
      )
      return data
    } catch (err) {
      console.log('deleteKyBaoCao', err)
      throw err
    }
  }

  QLKyBaoCao.reStoreKyBaoCao = async function(id) {
    try {
      const data = await QLKyBaoCao.upsertWithWhere(
        {
          id: id
        },
        { xoa: false }
      )
      return data
    } catch (err) {
      console.log('reStoreKyBaoCao', err)
      throw err
    }
  }

  QLKyBaoCao.remoteMethod('listKyBaoCao', {
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
        arg: 'ma',
        type: 'string'
      },
      {
        arg: 'ten',
        type: 'string'
      },
      {
        arg: 'ngayBatDau',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoHuyen',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoTinh',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoTW',
        type: 'date'
      },
      {
        arg: 'ngayDong',
        type: 'date'
      },
      {
        arg: 'ngayMo',
        type: 'date'
      },
      {
        arg: 'ngayTongHop',
        type: 'date'
      },
      {
        arg: 'ghiChu',
        type: 'string'
      },
      {
        arg: 'qlNamLamViecId',
        type: 'number'
      },
      {
        arg: 'sysKyBaoCaoId',
        type: 'number'
      },
      {
        arg: 'sysTrangThaiDongMoId',
        type: 'number'
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'get', path: '/list' }
  })

  QLKyBaoCao.remoteMethod('deletedListKyBaoCao', {
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
        arg: 'ma',
        type: 'string'
      },
      {
        arg: 'ten',
        type: 'string'
      },
      {
        arg: 'ngayBatDau',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoHuyen',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoTinh',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoTW',
        type: 'date'
      },
      {
        arg: 'ngayDong',
        type: 'date'
      },
      {
        arg: 'ngayMo',
        type: 'date'
      },
      {
        arg: 'ngayTongHop',
        type: 'date'
      },
      {
        arg: 'ghiChu',
        type: 'string'
      },
      {
        arg: 'qlNamLamViecId',
        type: 'number'
      },
      {
        arg: 'sysKyBaoCaoId',
        type: 'number'
      },
      {
        arg: 'sysTrangThaiDongMoId',
        type: 'number'
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'get', path: '/deleted-list' }
  })

  QLKyBaoCao.remoteMethod('readKyBaoCao', {
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

  QLKyBaoCao.remoteMethod('createKyBaoCao', {
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
        arg: 'ngayBatDau',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoHuyen',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoTinh',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoTW',
        type: 'date'
      },
      {
        arg: 'ngayDong',
        type: 'date'
      },
      {
        arg: 'ngayMo',
        type: 'date'
      },
      {
        arg: 'ngayTongHop',
        type: 'date'
      },
      {
        arg: 'ghiChu',
        type: 'string'
      },

      {
        arg: 'createdBy',
        type: 'number',
        required: true
      },
      {
        arg: 'qlNamLamViecId',
        type: 'number',
        required: true
      },
      {
        arg: 'sysKyBaoCaoId',
        type: 'number',
        required: true
      },
      {
        arg: 'sysTrangThaiDongMoId',
        type: 'number',
        required: true
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/create' }
  })

  QLKyBaoCao.remoteMethod('updateKyBaoCao', {
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
        arg: 'ngayBatDau',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoHuyen',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoTinh',
        type: 'date'
      },
      {
        arg: 'ngayBaoCaoTW',
        type: 'date'
      },
      {
        arg: 'ngayDong',
        type: 'date'
      },
      {
        arg: 'ngayMo',
        type: 'date'
      },
      {
        arg: 'ngayTongHop',
        type: 'date'
      },
      {
        arg: 'ghiChu',
        type: 'string'
      },
      {
        arg: 'updatedBy',
        type: 'number',
        required: true
      },
      {
        arg: 'qlNamLamViecId',
        type: 'number'
      },
      {
        arg: 'sysKyBaoCaoId',
        type: 'number'
      },
      {
        arg: 'sysTrangThaiDongMoId',
        type: 'number'
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'post', path: '/update' }
  })

  QLKyBaoCao.remoteMethod('deleteKyBaoCao', {
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

  QLKyBaoCao.remoteMethod('reStoreKyBaoCao', {
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
