let to = require('await-to-js').to;

'use_strict';

module.exports = function(QTDonVi) {
  const Promise = require('bluebird')
	  //create Quan Tri Don Vi
	  QTDonVi.createQTDonVi = async function(
        uid, 
        idCha, 
        ma, 
        ten,
        noiDung, 
        diaChi, 
        soDienThoai, 
        email, 
        laDonVi, 
        ghiChu,
        createdBy) {

        const qtDonViData = {
            uid: uid,
            idCha: idCha,
            ma: ma,
            ten: ten,
            noiDung: noiDung,
            diaChi: diaChi,
            soDienThoai: soDienThoai,
            email: email,
            laDonVi: laDonVi,
            ghiChu: ghiChu,
            createdAt: new Date(),
            createdBy: createdBy,
            hieuLuc: 1,
            xoa: 0
        }
        try {
            const data = await QTDonVi.create(qtDonViData)
            return data
          } catch (err) {
            console.log('create QT-Don-Vi', err)
            throw err
          }
        }
    

    //read Quan Tri Don Vi
    QTDonVi.readQTDonVi = async function(id) {
        try {
            const data = await QTDonVi.findById(id, {
                where: {
                xoa: 0
                }
            });
            return data;
        } catch (err) {
            console.log('read QT-Don-Vi', err)
            throw err
        }
    }

    //update Quan Tri Don Vi
    QTDonVi.updateQTDonVi = async function(
        id, 
        idCha, 
        ma,
        ten, 
        noiDung, 
        diaChi, 
        soDienThoai, 
        email, 
        laDonVi, 
        ghiChu, 
        updatedBy ) {
    	
        const qtDonViData = {
            id: id,
            idCha: idCha,
            ma: ma,
            ten: ten,
            noiDung: noiDung,
            diaChi: diaChi,
            soDienThoai: soDienThoai,
            email: email,
            laDonVi: laDonVi,
            ghiChu: ghiChu,
            updatedAt: new Date(),
            updatedBy: updatedBy    
        }

        try {
            const data = await QTDonVi.upsertWithWhere(
              {
                id: QTDonVi.id
              },
              qtDonViData
            )
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
          const [data, total] = await Promise.all([
            QTDonVi.find({
              where: {
                xoa: 0
              },
              fields: {
                ten: true,
                noidung: true
              }
            }),
            QTDonVi.count({
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
          console.log('listQTDonVi', err)
          throw err
        }
    }

    // list  deleted Quan Tri Don Vi
    QTDonVi.listdeletedQTDonVi = async function(page, pageSize) {
      try {
        const [data, total] = await Promise.all([
          QTDonVi.find({
            where: {
              xoa: 1
            },
            fields: {
              ten: true,
              noidung: true
            }
          }),
          QTDonVi.count({
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
        console.log('list deleted QTDonVi', err)
        throw err
      }
   }
    

    QTDonVi.remoteMethod('createQTDonVi', 
      {
        http: {path: '/create', verb: 'post'},
        accepts: [
            {arg: 'uid', type: 'number', required: true},
            {arg: 'idCha', type: 'number', required: false},
            {arg: 'ma', type: 'string', required: false},
            {arg: 'noiDung', type: 'string', required: false},
            {arg: 'diaChi', type: 'string', required: false},
            {arg: 'soDienThoai', type: 'string', required: false},
            {arg: 'email', type: 'string', required: false},
            {arg: 'laDonVi', type: 'boolean', required: false},
            {arg: 'ghiChu', type: 'string', required: false},
            {arg: 'createdBy', type: 'number', required: true}
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
            {arg: 'idCha', type: 'number', required: false},
            {arg: 'ma', type: 'string', required: false},
            {arg: 'noiDung', type: 'string', required: false},
            {arg: 'diaChi', type: 'string', required: false},
            {arg: 'soDienThoai', type: 'string', required: false},
            {arg: 'email', type: 'string', required: false},
            {arg: 'laDonVi', type: 'boolean', required: false},
            {arg: 'ghiChu', type: 'string', required: false},
            {arg: 'updatedBy', type: 'number', required: true}
        ],
        returns: { arg: 'data' }
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
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' },
      }
    )

    QTDonVi.remoteMethod('listdeletedQTDonVi', 
      {
        http: { verb: 'post', path: '/deleted_list' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' },
      })  

};