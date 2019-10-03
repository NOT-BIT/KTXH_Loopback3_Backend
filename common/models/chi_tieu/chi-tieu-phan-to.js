module.exports = function(ChiTieuPhanTo){
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")
    ChiTieuPhanTo.createCTPT = async function(uid, ma, ten, ghiChu){
        const CTPTData = {
            uid: uid,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await ChiTieuPhanTo.create(CTPTData)
            return data
        } catch (err) {
            console.log('createChiTieuPhanTo', err)
            throw err
        }
    }

    ChiTieuPhanTo.updateCTPT = async function(id, ma, ten, ghiChu, hieuLuc){
       const CTPTData = {
            id: id,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await ChiTieuPhanTo.upsertWithWhere({id: CTPTData.id, xoa: false}, CTPTData)
            return data
        } catch (err) {
            console.log('updateChiTieuPhanTo', err)
            throw err
        }
    }

    ChiTieuPhanTo.deleteCTPT = async function(id){
        try {
            const data = await ChiTieuPhanTo.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteChiTieuPhanTo', err)
            throw err
        }
    }
    
    ChiTieuPhanTo.restoreCTPT = async function(id){
        try {
            const data = await ChiTieuPhanTo.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreChiTieuPhanTo', err)
            throw err
        }
    }

    ChiTieuPhanTo.readCTPT = async function(id){
        try {
            const data = await ChiTieuPhanTo.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readChiTieuPhanTo', err)
            throw err
        }
    }

    ChiTieuPhanTo.listCTPT = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
              ChiTieuPhanTo.find({
                where: {queryData},
                limit: pageSize,
                skip: page
              }),
              ChiTieuPhanTo.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(ChiTieuPhanTo, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listChiTieuPhanTo', err)
            throw err
        }
    }

    ChiTieuPhanTo.listDeletedCTPT = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              ChiTieuPhanTo.find({
                where: {queryData},
                limit: pageSize,
                skip: page
              }),
              ChiTieuPhanTo.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(ChiTieuPhanTo, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedChiTieuPhanTo', err)
            throw err
        }
    }

    ChiTieuPhanTo.remoteMethod(
        'createCTPT', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'updateCTPT', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'deleteCTPT', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'restoreCTPT', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'readCTPT', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'listCTPT', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'listDeletedCTPT', {
            http: {path: '/deleted_list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )
}