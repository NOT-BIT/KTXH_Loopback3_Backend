module.exports = function(QTTacNhan) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    QTTacNhan.createTacNhan = async function(uid, ma, ten, sysCapHanhChinhId, ghiChu){
        const tacNhanData = {
            uid: uid,
            ma: ma,
            ten: ten,
            sysCapHanhChinhId: sysCapHanhChinhId,
            ghiChu: ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QTTacNhan.create(tacNhanData)
            return data
        } catch (err) {
            console.log('createQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.updateTacNhan = async function(id, ma, ten, sysCapHanhChinhId, ghiChu, hieuLuc){
        const tacNhanData = {
            id: id,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            sysCapHanhChinhId: sysCapHanhChinhId,
            hieuLuc: hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await QTTacNhan.upsertWithWhere({id: tacNhanData.id, xoa: false}, tacNhanData)
            return data
        } catch (err) {
            console.log('updateQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.deleteTacNhan = async function(id){
        try {
            const data = await QTTacNhan.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQTTacNhan', err)
            throw err
        }
    }
    
    QTTacNhan.restoreTacNhan = async function(id){
        try {
            const data = await QTTacNhan.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.readTacNhan = async function(id){
        try {
            const data = await QTTacNhan.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.listTacNhan = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
              QTTacNhan.find({
                where: {queryData},
                include: ['belongsToSysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QTTacNhan.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTTacNhan, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.listDeletedTacNhan = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              QTTacNhan.find({
                where: {queryData},
                include: ['belongsToSysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QTTacNhan.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTTacNhan, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.remoteMethod(
        'createTacNhan', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'sysCapHanhChinhId', type: 'number'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'updateTacNhan', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'sysCapHanhChinhId', type: 'number'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'deleteTacNhan', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'restoreTacNhan', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'readTacNhan', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'listTacNhan', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'listDeletedTacNhan', {
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