let to = require('await-to-js').to;

'use_strict';

module.exports = function(BieuNhapLieuDonViNhap) {
  const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")
	  //create Bieu Nhap Lieu Don Vi Nhap
	  BieuNhapLieuDonViNhap.createBieuNhapLieuDonViNhap = async function(
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
            const data = await BieuNhapLieuDonViNhap.create(bnlDonViNhapData)
            return data
          } catch (err) {
            console.log('create Bieu-Nhap-Lieu-Don-Vi-Nhap', err)
            throw err
          }
    }

    //read Bieu Nhap Lieu Chi Tieu
    BieuNhapLieuDonViNhap.readBieuNhapLieuDonViNhap = async function(id) {
    	try {
            const data = await BieuNhapLieuDonViNhap.findOne( {
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
    BieuNhapLieuDonViNhap.updateBieuNhapLieuDonViNhap = async function(
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
            const data = await BieuNhapLieuDonViNhap.upsertWithWhere(
              {
                id: BieuNhapLieuDonViNhap.id, 
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
    BieuNhapLieuDonViNhap.deleteBieuNhapLieuDonViNhap = async function(id) {
    	try {
            const data = await BieuNhapLieuDonViNhap.upsertWithWhere(
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
    BieuNhapLieuDonViNhap.restoreBieuNhapLieuDonViNhap = async function(id) {
    	try {
            const data = await BieuNhapLieuDonViNhap.upsertWithWhere(
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
    BieuNhapLieuDonViNhap.listBieuNhapLieuDonViNhap = async function(queryData, page, pageSize) {
        try {
          queryData.xoa = 0
          const [data, total] = await Promise.all([
            BieuNhapLieuDonViNhap.find({
              where: {queryData},
              include: ['belongsToBieuNhapLieu', 'belongsToDonViNhap']
            }),
            BieuNhapLieuDonViNhap.count({
              xoa: 0
            })
          ])
    
          return {
            rows: queryObject.listAPIReturnsList(BieuNhapLieuDonViNhap, data),
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
    BieuNhapLieuDonViNhap.listDeleteBieuNhapLieuDonViNhap = async function(queryData, page, pageSize) {
      try {
        queryData.xoa = 1
        const [data, total] = await Promise.all([
          BieuNhapLieuDonViNhap.find({
            where: {queryData},
            include: ['belongsToBieuNhapLieu', 'belongsToDonViNhap']
          }),
          BieuNhapLieuDonViNhap.count({
            xoa: 1
          })
        ])
  
        return {
          rows: queryObject.listAPIReturnsList(BieuNhapLieuDonViNhap, data),
          page: page,
          pageSize: pageSize,
          total: total
        }
      } catch (err) {
        console.log('list delete Bieu-Nhap-Lieu-Don-Vi-Nhap', err)
        throw err
      }
    }

    BieuNhapLieuDonViNhap.remoteMethod('createBieuNhapLieuDonViNhap', 
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

    BieuNhapLieuDonViNhap.remoteMethod('readBieuNhapLieuDonViNhap', 
      {
        http: {path: '/read', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}],
        returns: { arg: 'data' }
      },
    )

    BieuNhapLieuDonViNhap.remoteMethod('updateBieuNhapLieuDonViNhap', 
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

    BieuNhapLieuDonViNhap.remoteMethod('deleteBieuNhapLieuDonViNhap', 
      {
        http: {path: '/delete', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns:{ arg: 'data' }
      },
    )

    BieuNhapLieuDonViNhap.remoteMethod('restoreBieuNhapLieuDonViNhap', 
      {
        http: {path: '/restore', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns:{ arg: 'data' }
      },
    )

    BieuNhapLieuDonViNhap.remoteMethod('listBieuNhapLieuDonViNhap', 
      {
        http: { verb: 'post', path: '/list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' }
      })

    BieuNhapLieuDonViNhap.remoteMethod('listDeleteBieuNhapLieuDonViNhap', 
      {
        http: { verb: 'post', path: '/deleted_list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' }
      })


};