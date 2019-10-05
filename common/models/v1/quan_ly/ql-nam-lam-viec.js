module.exports = function(QLNamLamViec) {
    const Promise = require('bluebird')
      let queryObject = require("../../utils/query-object")
  
    QLNamLamViec.listNamLamViec = async function(page, pageSize, queryData) {
      try {
        queryData.xoa = 0
        const [data, total] = await Promise.all([
          QLNamLamViec.find({
            where: {queryData},
            include: ['belongsToSysTrangThaiDongMo'],
            limit: pageSize,
            skip: page
          }),
          QLNamLamViec.count({
            xoa: false
          })
        ])
  
        return {
          rows: queryObject.listAPIReturnsList(QLNamLamViec, data),
          page: page,
          pageSize: pageSize,
          total: total
        }
      } catch (err) {
        console.log('listNamLamViec', err)
        throw err
      }
    }
  
    QLNamLamViec.deletedListNamLamViec = async function(page, pageSize, queryData) {
      try {
        queryData.xoa = 1
        const [data, total] = await Promise.all([
          QLNamLamViec.find({
            where: {queryData},
            include: ['belongsToSysTrangThaiDongMo'],
            limit: pageSize,
            skip: page
          }),
          QLNamLamViec.count({
            xoa: true
          })
        ])
  
        return {
          rows: queryObject.listAPIReturnsList(QLNamLamViec, data),
          page: page,
          pageSize: pageSize,
          total: total
        }
      } catch (err) {
        console.log('deletedListNamLamViec', err)
        throw err
      }
    }
  
    QLNamLamViec.readNamLamViec = async function(id) {
      try {
        const data = await QLNamLamViec.findOne({where: {id: id, xoa: false}})
        return data
      } catch (err) {
        console.log('readBaoCaoBy', err)
        throw err
      }
    }
  
    QLNamLamViec.createNamLamViec = async function(
      uid,
      ma,
      ten,
      nam,
      ngayMoNam,
      ngayDongNam,
      ghiChu,
      sysTrangThaiDongMoId
    ) {
      const qlNamLamViec = {
        uid: uid,
        ma: ma,
        ten: ten,
        nam: nam,
        ngayMoNam: ngayMoNam,
        ngayDongNam: ngayDongNam,
        ghiChu: ghiChu,
        createdAt: new Date(),
        createdBy: 0,
        sysTrangThaiDongMoId: sysTrangThaiDongMoId
      }
  
      try {
        const data = await QLNamLamViec.create(qlNamLamViec)
        return data
      } catch (err) {
        console.log('createNamLamViec', err)
        throw err
      }
    }
  
    QLNamLamViec.updateNamLamViec = async function(
      id,
      ma,
      ten,
      nam,
      ngayMoNam,
      ngayDongNam,
      ghiChu,
      sysTrangThaiDongMoId, 
      hieuLuc
    ) {
      const qlNamLamViec = {
        id: id,
        ma: ma,
        ten: ten,
        nam: nam,
        ngayMoNam: ngayMoNam,
        ngayDongNam: ngayDongNam,
        ghiChu: ghiChu,
        updatedAt: new Date(),
        updatedBy: 0,
        sysTrangThaiDongMoId: sysTrangThaiDongMoId,
        hieuLuc: hieuLuc
      }
  
      try {
        const data = await QLNamLamViec.upsertWithWhere({ id: id, xoa: false }, qlNamLamViec)
        return data
      } catch (err) {
        console.log('updateNamLamViec', err)
        throw err
      }
    }
  
    QLNamLamViec.deleteNamLamViec = async function(id) {
      try {
        const data = await QLNamLamViec.upsertWithWhere(
          {
            id: id
          },
          { xoa: true }
        )
        return data
      } catch (err) {
        console.log('deleteNamLamViec', err)
        throw err
      }
    }
  
    QLNamLamViec.reStoreNamLamViec = async function(id) {
      try {
        const data = await QLNamLamViec.upsertWithWhere(
          {
            id: id
          },
          { xoa: false }
        )
        return data
      } catch (err) {
        console.log('reStoreNamLamViec', err)
        throw err
      }
    }
  
    QLNamLamViec.remoteMethod('listNamLamViec', {
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
  
    QLNamLamViec.remoteMethod('deletedListNamLamViec', {
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
  
    QLNamLamViec.remoteMethod('readNamLamViec', {
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
  
    QLNamLamViec.remoteMethod('createNamLamViec', {
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
          arg: 'nam',
          type: 'date'
        },
        {
          arg: 'ngayMoNam',
          type: 'date'
        },
        {
          arg: 'ngayDongNam',
          type: 'date'
        },
        {
          arg: 'ghiChu',
          type: 'string'
        },
        {
          arg: 'sysTrangThaiDongMoId',
          type: 'number'
        }
      ],
      returns: { arg: 'data' },
      http: { verb: 'post', path: '/create' }
    })
  
    QLNamLamViec.remoteMethod('updateNamLamViec', {
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
          arg: 'nam',
          type: 'date'
        },
        {
          arg: 'ngayMoNam',
          type: 'date'
        },
        {
          arg: 'ngayDongNam',
          type: 'date'
        },
        {
          arg: 'ghiChu',
          type: 'string'
        },
        {
          arg: 'sysTrangThaiDongMoId',
          type: 'number'
        },
        {
          arg: "hieuLuc",
          type: "boolean"
        }
      ],
      returns: { arg: 'data' },
      http: { verb: 'post', path: '/update' }
    })
  
    QLNamLamViec.remoteMethod('deleteNamLamViec', {
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
  
    QLNamLamViec.remoteMethod('reStoreNamLamViec', {
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
  