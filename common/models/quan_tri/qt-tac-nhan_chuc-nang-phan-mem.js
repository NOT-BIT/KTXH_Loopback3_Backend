let to = require('await-to-js').to;
'use_strict';

module.exports = function(QTTacNhan_ChucNangPhanMem) {
  const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")
	  //create Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhan_ChucNangPhanMem.createQTTacNhanChucNangPhanMem = async function(uid, ma, ten,
      qtTacNhanId, qtChucNangPhanMemId, ghiChu
        ) {
        const qtTNCNPMdata = {
            uid: uid,
            ma: ma,
            ten: ten,
            qtTacNhanId: qtTacNhanId,
            qtChucNangPhanMemId: qtChucNangPhanMemId,
            ghiChu: ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QTTacNhan_ChucNangPhanMem.create(qtTNCNPMdata)
            return data
          } catch (err) {
            console.log('create QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
          }
    }

    //read Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhan_ChucNangPhanMem.readQTTacNhanChucNangPhanMem = async function(id) {
    	try {
            const data = await QTTacNhan_ChucNangPhanMem.findOne({where: {id: id, xoa: false}})
            return data;
        } catch (err) {
            console.log('read QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
        }
    }

    //update Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhan_ChucNangPhanMem.updateQTTacNhanChucNangPhanMem = async function(id, ma, ten,
      qtTacNhanId, qtChucNangPhanMemId, ghiChu, hieuLuc) {

        const qtTacNhanChucNangPhanMemData = {
            id: id,
            ma: ma,
            ten: ten,
            qtTacNhanId: qtTacNhanId,
            qtChucNangPhanMemId: qtChucNangPhanMemId,
            ghiChu:ghiChu,
            updatedAt: new Date(),
            updatedBy: 0,
            hieuLuc: hieuLuc
        }
        try {
            const data = await QTTacNhan_ChucNangPhanMem.upsertWithWhere(
              {
                id: qtTacNhanChucNangPhanMemData.id, xoa: false
              },
              qtTacNhanChucNangPhanMemData
            )
            return data
          } catch (err) {
            console.log('update QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
          }
    }

    //delete Quan Tri Tac Nhan Chuc Nang Phan Mem --- change xoa 0 -> 1 
    QTTacNhan_ChucNangPhanMem.deleteQTTacNhanChucNangPhanMem = async function(id) {
    	try {
            const data = await QTTacNhan_ChucNangPhanMem.upsertWithWhere(
              {
                id: id
              },
              { xoa: 1 }
            )
            return data
          } catch (err) {
            console.log('delete QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
          }
    }

    //restore Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhan_ChucNangPhanMem.restoreQTTacNhanChucNangPhanMem = async function(id) {
        try {
            const data = await QTTacNhan_ChucNangPhanMem.upsertWithWhere(
              {
                id: id
              },
              { xoa: 0 }
            )
            return data
          } catch (err) {
            console.log('restore QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
          }
    }

    //list Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhan_ChucNangPhanMem.listQTTacNhanChucNangPhanMem = async function(queryData, page, pageSize) {
        try {
          queryData.xoa = 0
          const [data, total] = await Promise.all([
            QTTacNhan_ChucNangPhanMem.find({
              where: {queryData},
              include: ['belongsToQTTacNhan', 'belongsToQTChucNangPhanMem']
            }),
            QTTacNhan_ChucNangPhanMem.count({
              xoa: 0
            })
          ])
    
          return {
            rows: queryObject.listAPIReturnsList(QTTacNhan_ChucNangPhanMem, data),
            page: page,
            pageSize: pageSize,
            total: total
          }
        } catch (err) {
          console.log('list QT_tac-nhan_chuc-nang-phan-mem', err)
          throw err
        }
    }

    //list deleted Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhan_ChucNangPhanMem.listdeletedQTTacNhanChucNangPhanMem = async function(queryData, page, pageSize) {
      try {
        queryData.xoa = 1
        const [data, total] = await Promise.all([
          QTTacNhan_ChucNangPhanMem.find({
            where: {queryData},
            include: ['belongsToQTTacNhan', 'belongsToQTChucNangPhanMem']
          }),
          QTTacNhan_ChucNangPhanMem.count({
            xoa: 1
          })
        ])
  
        return {
          rows: queryObject.listAPIReturnsList(QTTacNhan_ChucNangPhanMem, data),
          page: page,
          pageSize: pageSize,
          total: total
        }
      } catch (err) {
        console.log('list deleted QT_tac-nhan_chuc-nang-phan-mem', err)
        throw err
      }
    }

    QTTacNhan_ChucNangPhanMem.remoteMethod('createQTTacNhanChucNangPhanMem', 
      {
        http: {path: '/create', verb: 'post'},
        accepts: [
            {arg: 'uid', type: 'string', required: true},
            {arg: 'ma', type: 'string', required: true},
            {arg: 'ten', type: 'string'},
            {arg: 'qtTacNhanId', type: 'number'},
            {arg: 'qtChucNangPhanMemId', type: 'number'},
            {arg: 'ghiChu', type: 'string'}
        ],
        returns: { arg: 'data' },
      },
    )

    QTTacNhan_ChucNangPhanMem.remoteMethod('readQTTacNhanChucNangPhanMem', 
      {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: { arg: 'data' },
      },
    )

    QTTacNhan_ChucNangPhanMem.remoteMethod('updateQTTacNhanChucNangPhanMem', 
      {
        http: {path: '/update', verb: 'post'},
        accepts: [
          {arg: 'id', type: 'number', required: true},
          {arg: 'ma', type: 'string'},
          {arg: 'ten', type: 'string'},
          {arg: 'qtTacNhanId', type: 'number'},
          {arg: 'qtChucNangPhanMemId', type: 'number'},
          {arg: 'ghiChu', type: 'string'},
          {arg: 'hieuLuc', type: 'boolean'}
      ],
        returns: { arg: 'data' },
      },
    )

    QTTacNhan_ChucNangPhanMem.remoteMethod('deleteQTTacNhanChucNangPhanMem', 
      {
        http: {path: '/delete', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns: { arg: 'data' },
      },
    )

    QTTacNhan_ChucNangPhanMem.remoteMethod('restoreQTTacNhanChucNangPhanMem', 
      {
        http: {path: '/restore', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns: { arg: 'data' },
      }
    )
    
    QTTacNhan_ChucNangPhanMem.remoteMethod('listQTTacNhanChucNangPhanMem',
      {
        http: { verb: 'post', path: '/list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' },
      }
    )

    QTTacNhan_ChucNangPhanMem.remoteMethod('listdeletedQTTacNhanChucNangPhanMem',
      {
        http: { verb: 'post', path: '/deleted_list' },
        accepts: [
          { arg: 'queryData', type: 'object'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' },
      }
    )
};