module.exports = function(QLKyBaoCao) {
  QLKyBaoCao.getAllKyBaoCao = async function() {
    try {
      const data = await QLKyBaoCao.find()
      return data
    } catch (err) {
      console.log('findAllKyBaoCao', err)
      return err
    }
  }

  QLKyBaoCao.getKyBaoCaoById = async function(id) {
    try {
      const data = await QLKyBaoCao.find({
        where: {
          id: id
        }
      })
      return data
    } catch (err) {
      console.log('findKyBaoCaoById', err)
      return err
    }
  }

  QLKyBaoCao.createKyBaoCao = async function(
    ngayBatDau,
    ngayBaoCaoHuyen,
    ngayBaoCaoTinh,
    ngayBaoCaoTW,
    ngayDong,
    ngayMo,
    ngayTongHop,
    noiDung,
    qlNamLamViecId,
    sysKyBaoCaoId,
    sysTrangThaiDongMoId
  ) {
    const qlKyBaoCao = {
      ngayBatDau: ngayBatDau,
      ngayBaoCaoHuyen: ngayBaoCaoHuyen,
      ngayBaoCaoTinh: ngayBaoCaoTinh,
      ngayBaoCaoTW: ngayBaoCaoTW,
      ngayDong: ngayDong,
      ngayMo: ngayMo,
      ngayTongHop: ngayTongHop,
      noiDung: noiDung,
      qlNamLamViecId: qlNamLamViecId,
      sysKyBaoCaoId: sysKyBaoCaoId,
      sysTrangThaiDongMoId: sysTrangThaiDongMoId
    }

    try {
      const data = await QLKyBaoCao.create(qlKyBaoCao)
      return data
    } catch (err) {
      console.log('createQLKyBaoCao', err)
      return err
    }
  }

  QLKyBaoCao.updateKyBaoCao = async function(qlKyBaoCao) {
    try {
      const data = await QLKyBaoCao.update({
        where: {
          id: qlKyBaoCao.id
        },
        data: qlKyBaoCao
      })
      return data
    } catch (err) {
      console.log('updateQLKyBaoCao', err)
      return err
    }
  }

  QLKyBaoCao.deleteKyBaoCao = async function(id) {
    try {
      const data = await QLKyBaoCao.destroyById(id)
      return data
    } catch (err) {
      console.log('deleteQLKyBaoCao', err)
      return err
    }
  }

  QLKyBaoCao.remoteMethod('getAllKyBaoCao', {
    accepts: [],
    returns: { arg: 'data' },
    http: { verb: 'get', path: '/kybaocao' }
  })

  QLKyBaoCao.remoteMethod('getKyBaoCaoById', {
    accepts: [
      {
        arg: 'id',
        type: 'number'
      }
    ],
    returns: { arg: 'data' },
    http: { verb: 'get', path: '/kybaocao/:id' }
  })

  QLKyBaoCao.remoteMethod('createKyBaoCao', {
    accepts: [
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
        arg: 'noiDung',
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
    http: { verb: 'post', path: '/kybaocao' }
  })
}
