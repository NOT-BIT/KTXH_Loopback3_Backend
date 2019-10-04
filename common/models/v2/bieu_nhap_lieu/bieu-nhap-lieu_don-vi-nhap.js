let to = require('await-to-js').to;

'use_strict';

module.exports = function(BieuNhapLieu_DonViNhap) {
  const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")
	  //create Bieu Nhap Lieu Don Vi Nhap
	  BieuNhapLieu_DonViNhap.createBieuNhapLieu_DonViNhap = async function(
        uid, 
        ma,
        ten,
        bieuNhapLieuId, 
        donViNhapId,
        ghiChu
        ) {
       
        const bnlDonViNhapData = {
            uid: uid,
            ma: ma,
            ten: ten,
            bieuNhapLieuId: bieuNhapLieuId,
            donViNhapId: donViNhapId,
            ghiChu:ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await BieuNhapLieu_DonViNhap.create(bnlDonViNhapData)
            return data
          } catch (err) {
            console.log('create Bieu-Nhap-Lieu-Don-Vi-Nhap', err)
            throw err
          }
    }

    //read Bieu Nhap Lieu Chi Tieu
    BieuNhapLieu_DonViNhap.readBieuNhapLieu_DonViNhap = async function(id) {
    	try {
            const data = await BieuNhapLieu_DonViNhap.findOne( {
                where: {
                id: id,
                xoa: 0
                }
            });
            return data;
        } catch (err) {
            console.log('read Bieu-Nhap-Lieu-Don-Vi-Nhap', err)
            throw err
        }
    }

    //update Bieu Nhap Lieu Chi Tieu
    BieuNhapLieu_DonViNhap.updateBieuNhapLieu_DonViNhap = async function(
        id, 
        ma,
        ten,
        bieuNhapLieuId, 
        donViNhapId,
        ghiChu,
        hieuLuc
        ) {
    	
        const bnlDonViNhapData = {
            id: id,
            ma: ma,
            ten: ten,
            bieuNhapLieuId: bieuNhapLieuId,
            donViNhapId: donViNhapId,
            ghiChu:ghiChu,
            hieuLuc: hieuLuc,
            updatedAt: new Date(),
            updatedBy: 0
        }
        try {
            const data = await BieuNhapLieu_DonViNhap.upsertWithWhere(
              {
                id: BieuNhapLieu_DonViNhap.id, 
                xoa: false
              },
              bnlDonViNhapData
            )
            return data
          } catch (err) {
            console.log('update Bieu-Nhap-Lieu-Don-Vi-Nhap', err)
            throw err
          }
    }

    //delete Bieu Nhap Lieu Chi Tieu 
    BieuNhapLieu_DonViNhap.deleteBieuNhapLieu_DonViNhap = async function(id) {
    	try {
            const data = await BieuNhapLieu_DonViNhap.upsertWithWhere(
              {
                id: id
              },
              { xoa: 1 }
            )
            return data
          } catch (err) {
            console.log('delete Bieu-Nhap-Lieu-Don-Vi-Nhap', err)
            throw err
          }
    }

    // Restore Bieu Nhap Lieu Chi Tieu
    BieuNhapLieu_DonViNhap.restoreBieuNhapLieu_DonViNhap = async function(id) {
    	try {
            const data = await BieuNhapLieu_DonViNhap.upsertWithWhere(
              {
                id: id
              },
              { xoa: 0 }
            )
            return data
          } catch (err) {
            console.log('restore Bieu-Nhap-Lieu-Don-Vi-Nhap', err)
            throw err
          }
    	
    }

    //list Bieu Nhap Lieu Chi Tieu
    BieuNhapLieu_DonViNhap.listBieuNhapLieu_DonViNhap = async function(queryData, page, pageSize) {
        try {
          queryData.xoa = 0
          const [data, total] = await Promise.all([
            BieuNhapLieu_DonViNhap.find({
              where: {queryData},
              include: ['belongsToBieuNhapLieu', 'belongsToDonViNhap']
            }),
            BieuNhapLieu_DonViNhap.count({
              xoa: 0
            })
          ])
    
          return {
            rows: queryObject.listAPIReturnsList(BieuNhapLieu_DonViNhap, data),
            page: page,
            pageSize: pageSize,
            total: total
          }
        } catch (err) {
          console.log('list Bieu-Nhap-Lieu-Don-Vi-Nhap', err)
          throw err
        }
    }

    //list deleted Bieu Nhap Lieu Chi Tieu
    BieuNhapLieu_DonViNhap.listDeleteBieuNhapLieu_DonViNhap = async function(queryData, page, pageSize) {
      try {
        queryData.xoa = 1
        const [data, total] = await Promise.all([
          BieuNhapLieu_DonViNhap.find({
            where: {queryData},
            include: ['belongsToBieuNhapLieu', 'belongsToDonViNhap']
          }),
          BieuNhapLieu_DonViNhap.count({
            xoa: 1
          })
        ])
  
        return {
          rows: queryObject.listAPIReturnsList(BieuNhapLieu_DonViNhap, data),
          page: page,
          pageSize: pageSize,
          total: total
        }
      } catch (err) {
        console.log('list delete Bieu-Nhap-Lieu-Don-Vi-Nhap', err)
        throw err
      }
    }

    BieuNhapLieu_DonViNhap.remoteMethod('createBieuNhapLieu_DonViNhap', 
      {
        http: {path: '/create', verb: 'post'},
        accepts: [
            {arg: 'uid', type: 'string', required: true},
            {arg: 'ma', type: 'string', required: true},
            {arg: 'ten', type: 'string'},
            {arg: 'bieuNhapLieuId', type: 'number', required: true},
            {arg: 'donViNhapId', type: 'number', required: true},
            {arg: 'ghiChu', type: 'string'}
        ],
        returns: { arg: 'data' },
      }
    )

    BieuNhapLieu_DonViNhap.remoteMethod('readBieuNhapLieu_DonViNhap', 
      {
        http: {path: '/read', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}],
        returns: { arg: 'data' }
      },
    )

    BieuNhapLieu_DonViNhap.remoteMethod('updateBieuNhapLieu_DonViNhap', 
      {
        http: {path: '/update', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true},
            {arg: 'ma', type: 'string'},
            {arg: 'ten', type: 'string'},
            {arg: 'bieuNhapLieuId', type: 'number'},
            {arg: 'donViNhapId', type: 'number'},
            {arg: 'ghiChu', type: 'string'},
            {arg: 'hieuLuc', type: 'boolean'}
        ],
        returns: { arg: 'data' },
      },
    )

    BieuNhapLieu_DonViNhap.remoteMethod('deleteBieuNhapLieu_DonViNhap', 
      {
        http: {path: '/delete', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns:{ arg: 'data' }
      },
    )

    BieuNhapLieu_DonViNhap.remoteMethod('restoreBieuNhapLieu_DonViNhap', 
      {
        http: {path: '/restore', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns:{ arg: 'data' }
      },
    )

    BieuNhapLieu_DonViNhap.remoteMethod('listBieuNhapLieu_DonViNhap', 
      {
        http: { verb: 'post', path: '/list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' }
      })

    BieuNhapLieu_DonViNhap.remoteMethod('listDeleteBieuNhapLieu_DonViNhap', 
      {
        http: { verb: 'post', path: '/deleted_list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' }
      })


};