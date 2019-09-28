let to = require('await-to-js').to;

'use_strict';

module.exports = function(BieuNhapLieuChiTieu) {
  const Promise = require('bluebird')
	  //create Bieu Nhap Lieu Chi Tieu
	  BieuNhapLieuChiTieu.createBieuNhapLieuChiTieu = async function(
        uid, 
        ma,
        ten,
        bieuNhapLieuId, 
        chiTieuId,
        ghiChu
        ) {
       
        const bnlChiTieuData = {
            uid: uid,
            ma: ma,
            ten: ten,
            bieuNhapLieuId: bieuNhapLieuId,
            chiTieuId: chiTieuId,
            ghiChu:ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await BieuNhapLieuChiTieu.create(bnlChiTieuData)
            return data
          } catch (err) {
            console.log('create Bieu-Nhap-Lieu-Chi-Tieu', err)
            throw err
          }
    }

    //read Bieu Nhap Lieu Chi Tieu
    BieuNhapLieuChiTieu.readBieuNhapLieuChiTieu = async function(id) {
    	try {
            const data = await BieuNhapLieuChiTieu.findOne( {
                where: {
                id: id,
                xoa: 0
                }
            });
            return data;
        } catch (err) {
            console.log('read Bieu-Nhap-Lieu-Chi-Tieu', err)
            throw err
        }
    }

    //update Bieu Nhap Lieu Chi Tieu
    BieuNhapLieuChiTieu.updateBieuNhapLieuChiTieu = async function(
        id, 
        ma,
        ten,
        bieuNhapLieuId, 
        chiTieuId,
        ghiChu,
        hieuLuc
        ) {
    	
        const bnlChiTieuData = {
            id: id,
            ma: ma,
            ten: ten,
            bieuNhapLieuId: bieuNhapLieuId,
            chiTieuId: chiTieuId,
            ghiChu:ghiChu,
            hieuLuc: hieuLuc,
            updatedAt: new Date(),
            updatedBy: 0
        }
        try {
            const data = await BieuNhapLieuChiTieu.upsertWithWhere(
              {
                id: BieuNhapLieuChiTieu.id, 
                xoa: false
              },
              bnlChiTieuData
            )
            return data
          } catch (err) {
            console.log('update Bieu-Nhap-Lieu-Chi-Tieu', err)
            throw err
          }
    }

    //delete Bieu Nhap Lieu Chi Tieu 
    BieuNhapLieuChiTieu.deleteBieuNhapLieuChiTieu = async function(id) {
    	try {
            const data = await BieuNhapLieuChiTieu.upsertWithWhere(
              {
                id: id
              },
              { xoa: 1 }
            )
            return data
          } catch (err) {
            console.log('delete Bieu-Nhap-Lieu-Chi-Tieu', err)
            throw err
          }
    }

    // Restore Bieu Nhap Lieu Chi Tieu
    BieuNhapLieuChiTieu.restoreBieuNhapLieuChiTieu = async function(id) {
    	try {
            const data = await BieuNhapLieuChiTieu.upsertWithWhere(
              {
                id: id
              },
              { xoa: 0 }
            )
            return data
          } catch (err) {
            console.log('restore Bieu-Nhap-Lieu-Chi-Tieu', err)
            throw err
          }
    	
    }

    //list Bieu Nhap Lieu Chi Tieu
    BieuNhapLieuChiTieu.listBieuNhapLieuChiTieu = async function(queryData, page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            BieuNhapLieuChiTieu.find({
              where: {
                xoa: 0
              },
              fields: {
                ma: true, ten: true, ghiChu: true, hieuLuc: true, bieuNhapLieuId: true, chiTieuId: true
              },
              include: ['belongsToBieuNhapLieu', 'belongsToChiTieu']
            }),
            BieuNhapLieuChiTieu.count({
              xoa: 0
            })
          ])
    
          return {
            rows: data,
            page: page,
            pageSize: pageSize,
            total: total
          }
        } catch (err) {
          console.log('list Bieu-Nhap-Lieu-Chi-Tieu', err)
          throw err
        }
    }

    //list deleted Bieu Nhap Lieu Chi Tieu
    BieuNhapLieuChiTieu.listDeleteBieuNhapLieuChiTieu = async function(queryData, page, pageSize) {
      try {
        const [data, total] = await Promise.all([
          BieuNhapLieuChiTieu.find({
            where: {
              xoa: 1
            },
            fields: {
              ma: true, ten: true, ghiChu: true, hieuLuc: true, bieuNhapLieuId: true, chiTieuId: true
            },
            include: ['belongsToBieuNhapLieu', 'belongsToChiTieu']
          }),
          BieuNhapLieuChiTieu.count({
            xoa: 1
          })
        ])
  
        return {
          rows: data,
          page: page,
          pageSize: pageSize,
          total: total
        }
      } catch (err) {
        console.log('list delete Bieu-Nhap-Lieu-Chi-Tieu', err)
        throw err
      }
    }

    BieuNhapLieuChiTieu.remoteMethod('createBieuNhapLieuChiTieu', 
      {
        http: {path: '/create', verb: 'post'},
        accepts: [
            {arg: 'uid', type: 'string', required: true},
            {arg: 'ma', type: 'string', required: true},
            {arg: 'ten', type: 'string'},
            {arg: 'bieuNhapLieuId', type: 'number', required: true},
            {arg: 'chiTieuId', type: 'number', required: true},
            {arg: 'ghiChu', type: 'string'}
        ],
        returns: { arg: 'data' },
      }
    )

    BieuNhapLieuChiTieu.remoteMethod('readBieuNhapLieuChiTieu', 
      {
        http: {path: '/read', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}],
        returns: { arg: 'data' }
      },
    )

    BieuNhapLieuChiTieu.remoteMethod('updateBieuNhapLieuChiTieu', 
      {
        http: {path: '/update', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true},
            {arg: 'ma', type: 'string'},
            {arg: 'ten', type: 'string'},
            {arg: 'bieuNhapLieuId', type: 'number'},
            {arg: 'chiTieuId', type: 'number'},
            {arg: 'ghiChu', type: 'string'},
            {arg: 'hieuLuc', type: 'boolean'}
        ],
        returns: { arg: 'data' },
      },
    )

    BieuNhapLieuChiTieu.remoteMethod('deleteBieuNhapLieuChiTieu', 
      {
        http: {path: '/delete', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns:{ arg: 'data' }
      },
    )

    BieuNhapLieuChiTieu.remoteMethod('restoreBieuNhapLieuChiTieu', 
      {
        http: {path: '/restore', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns:{ arg: 'data' }
      },
    )

    BieuNhapLieuChiTieu.remoteMethod('listBieuNhapLieuChiTieu', 
      {
        http: { verb: 'post', path: '/list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' }
      })

    BieuNhapLieuChiTieu.remoteMethod('listDeleteBieuNhapLieuChiTieu', 
      {
        http: { verb: 'post', path: '/deleted_list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' }
      })


};