let to = require('await-to-js').to;
let constants = require('../../constants/constants')
const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

module.exports = function(QTDonVi) {
	  //create Quan Tri Don Vi
    QTDonVi.createQTDonVi = async function(uid, ma, ten, donViChaId,
      diaChi, soDienThoai, email, laDonVi, ghiChu) {
        const qtDonViData = {
          uid: uid,
          ma: ma,
          ten: ten,
          donViChaId: donViChaId,
          diaChi: diaChi,
          soDienThoai: soDienThoai,
          email: email,
          laDonVi: laDonVi,
          ghiChu: ghiChu,
          createdAt: new Date(),
          createdBy: 0
        }

        try {
          const result = await QTDonVi.create(qtDonViData)
          return {
            statusCode: 200,
            message: "Success",
            result: result
          }
        } catch (err) {
          console.log('create QT-Don-Vi', err)
          throw err
        }
      }
    

    //read Quan Tri Don Vi
    QTDonVi.readQTDonVi = async function(id) {
        try {
            const data = await QTDonVi.findOne({where: {id: id, xoa: false}})
            return data;
        } catch (err) {
            console.log('read QT-Don-Vi', err)
            throw err
        }
    }

    //update Quan Tri Don Vi
    QTDonVi.updateQTDonVi = async function(id, ma, ten, donViChaId,
      diaChi, soDienThoai, email, laDonVi, ghiChu, hieuLuc) {
            const qtDonViData = {
              id: id,
              ma: ma,
              ten: ten,
              donViChaId: donViChaId,
              diaChi: diaChi,
              soDienThoai: soDienThoai,
              email: email,
              laDonVi: laDonVi,
              ghiChu: ghiChu,
              updatedAt: new Date(),
              hieuLuc: hieuLuc
            }
            try {
                const data = await QTDonVi.upsertWithWhere({id: id, xoa: 0}, qtDonViData)
                return data
            } catch (err) {
                console.log('update QT-Don-Vi', err)
                throw err
            }
    }

    //delete Quan Tri Don Vi 
    QTDonVi.deleteQTDonVi = async function(id) {
        try {
            const data = await QTDonVi.upsertWithWhere(
              {
                id: id
              },
              { xoa: 1 }
            )
            return data
          } catch (err) {
            console.log('delete QT-Don-Vi', err)
            throw err
          }
    }

    // Restore Quan Tri Don Vi 
    QTDonVi.restoreQTDonVi = async function(id) {
    	try {
            const data = await QTDonVi.upsertWithWhere(
              {
                id: id
              },
              { xoa: 0 }
            )
            return data
          } catch (err) {
            console.log('restore QT-Don-Vi', err)
            throw err
          }
    }

    // list Quan Tri Don Vi
    QTDonVi.listQTDonVi = async function(page, pageSize) {
        try {
          queryData.xoa = 0
          const [data, total] = await Promise.all([
            QTDonVi.find({
              where: {queryData}
            }),
            QTDonVi.count({
              xoa: 0
            })
          ])
    
          return {
            rows: queryObject.listAPIReturnsList(QTDonVi, data),
            page: page,
            pageSize: pageSize,
            total: total
          }
        } catch (err) {
          console.log('listQTDonVi', err)
          throw err
        }
    }

    // list  deleted Quan Tri Don Vi
    QTDonVi.listdeletedQTDonVi = async function(page, pageSize) {
      try {
        queryData.xoa = 1
        const [data, total] = await Promise.all([
          QTDonVi.find({
            where: {queryData}
          }),
          QTDonVi.count({
            xoa: 1
          })
        ])
  
        return {
          rows: queryObject.listAPIReturnsList(QTDonVi, data),
          page: page,
          pageSize: pageSize,
          total: total
        }
      } catch (err) {
        console.log('list deleted QTDonVi', err)
        throw err
      }
   }
    

    QTDonVi.remoteMethod('createQTDonVi', 
      {
        http: {path: '/create', verb: 'post'},
        accepts: [
            {arg: 'uid', type: 'string', required: true},
            {arg: 'ma', type: 'string', required: true},
            {arg: 'ten', type: 'string'},
            {arg: 'iddonViChaId', type: 'number'},
            {arg: 'diaChi', type: 'string'},
            {arg: 'soDienThoai', type: 'string'},
            {arg: 'email', type: 'string'},
            {arg: 'laDonVi', type: 'boolean'},
            {arg: 'ghiChu', type: 'string'}
        ],
        returns: { arg: 'data' },
      }
    )

    QTDonVi.remoteMethod('readQTDonVi', 
      {
        http: {path: '/read', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}],
        returns: { arg: 'data' }
      },
    )

    QTDonVi.remoteMethod('updateQTDonVi', 
      {
        http: {path: '/update', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true},
            {arg: 'ma', type: 'string'},
            {arg: 'ten', type:'string'},
            {arg: 'donViChaId', type: 'number'},
            {arg: 'diaChi', type: 'string'},
            {arg: 'soDienThoai', type: 'string'},
            {arg: 'email', type: 'string'},
            {arg: 'laDonVi', type: 'boolean'},
            {arg: 'ghiChu', type: 'string'},
            {arg: 'hieuLuc', type: 'boolean'},
        ],
        returns: { arg: 'data', type: 'object' }
      },
    )

    QTDonVi.remoteMethod('deleteQTDonVi', 
      {
        http: {path: '/delete', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns:{ arg: 'data' }
      },
    )

    QTDonVi.remoteMethod('restoreQTDonVi', 
      {
        http: {path: '/restore', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns:{ arg: 'data' }
      },
    )

    QTDonVi.remoteMethod('listQTDonVi', 
      {
        http: { verb: 'post', path: '/list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' },
      }
    )

    QTDonVi.remoteMethod('listdeletedQTDonVi', 
      {
        http: { verb: 'post', path: '/deleted_list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' },
      })  

};