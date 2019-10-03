module.exports = function(BieuNhapLieu) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    BieuNhapLieu.createBNL = async function(uid, ma, ten, sysLoaiBieuNhapLieuId, kyHieuBieu, kyBaoCao, donViNhapLieu, donViNhanBaoCao, donViTongHop, ghiChu){
        const BNLData = {
            uid,
            ma,
            ten,
            sysLoaiBieuNhapLieuId,
            kyHieuBieu,
            kyBaoCao,
            donViNhapLieu,
            donViNhanBaoCao,
            donViTongHop,
            ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await BieuNhapLieu.create(BNLData)
            return data
        } catch (err) {
            console.log('createBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.updateBNL = async function(id, ma, ten, sysLoaiBieuNhapLieuId, kyHieuBieu, kyBaoCao, donViNhapLieu, donViNhanBaoCao, donViTongHop, ghiChu, hieuLuc){
       const BNLData = {
            id,
            ma,
            ten,
            sysLoaiBieuNhapLieuId,
            kyHieuBieu,
            kyBaoCao,
            donViNhapLieu,
            donViNhanBaoCao,                
            donViTongHop,
            ghiChu,
            hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await BieuNhapLieu.upsertWithWhere({id: BNLData.id, xoa: false}, BNLData)
            return data
        } catch (err) {
            console.log('updateBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.deleteBNL = async function(id){
        try {
            const data = await BieuNhapLieu.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.restoreBNL = async function(id){
        try {
            const data = await BieuNhapLieu.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.readBNL = async function(id){
        try {
            const data = await BieuNhapLieu.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.listBNL= async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
                BieuNhapLieu.find({
                where: {queryData},
                include: ['belongsToSysLoaiBieuNhapLieu'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(BieuNhapLieu, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.listDeletedBNL = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              BieuNhapLieu.find({
                where: {queryData},
                include: ['belongsToSysLoaiBieuNhapLieu'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(BieuNhapLieu, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.remoteMethod(
        'createBNL', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'sysLoaiBieuNhapLieuId', type: 'number'},
                {arg: 'kyHieuBieu', type: 'string'},
                {arg: 'kyBaoCao', type: 'string'},
                {arg: 'donViNhapLieu', type: 'string'},
                {arg: 'donViNhanBaoCao', type: 'string'},
                {arg: 'donViTongHop', type: 'string'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu.remoteMethod(
        'updateBNL', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'sysLoaiBieuNhapLieuId', type: 'number'},
                {arg: 'kyHieuBieu', type: 'string'},
                {arg: 'kyBaoCao', type: 'string'},
                {arg: 'donViNhapLieu', type: 'string'},
                {arg: 'donViNhanBaoCao', type: 'string'},
                {arg: 'donViTongHop', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu.remoteMethod(
        'deleteBNL', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu.remoteMethod(
        'restoreBNL', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu.remoteMethod(
        'readBNL', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu.remoteMethod(
        'listBNL', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu.remoteMethod(
        'listDeletedBNL', {
            http: {path: '/deleted_list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )
}