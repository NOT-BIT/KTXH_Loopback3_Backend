module.exports = function(QTUsers_TacNhan) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    QTUsers_TacNhan.createUsers_TacNhan = async function(uid, ma, ten, qtUsersId, qtTacNhanId, ghiChu){
        const UTData = {
            uid: uid,
            ma: ma,
            ten: ten,
            qtUsersId: qtUsersId,
            qtTacNhanId: qtTacNhanId,
            ghiChu: ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QTUsers_TacNhan.create(UTData)
            return data
        } catch (err) {
            console.log('createQTUsers_TacNhan', err)
            throw err
        }
    }

    QTUsers_TacNhan.updateUsers_TacNhan = async function(id, ma, ten, qtUsersId, qtTacNhanId, ghiChu, hieuLuc){
        const UTData = {
            id: id,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,                
            qtUsersId: qtUsersId,
            qtTacNhanId: qtTacNhanId,
            hieuLuc: hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await QTUsers_TacNhan.upsertWithWhere({id: UTData.id, xoa: false}, UTData)
            return data
        } catch (err) {
            console.log('updateQTUsers_TacNhan', err)
            throw err
        }
    }

    QTUsers_TacNhan.deleteUsers_TacNhan = async function(id){
        try {
            const data = await QTUsers_TacNhan.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQTUsers_TacNhan', err)
            throw err
        }
    }
    
    QTUsers_TacNhan.restoreUsers_TacNhan = async function(id){
        try {
            const data = await QTUsers_TacNhan.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQTUsers_TacNhan', err)
            throw err
        }
    }

    QTUsers_TacNhan.readUsers_TacNhan = async function(id){
        try {
            const data = await QTUsers_TacNhan.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readQTUsers_TacNhan', err)
            throw err
        }
    }

    QTUsers_TacNhan.listUsers_TacNhan = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
              QTUsers_TacNhan.find({
                where: {queryData},
                include: ['belongsToQTUsers', 'belongsToQTTacNhan'],
                limit: pageSize,
                skip: page
              }),
              QTUsers_TacNhan.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTTacNhan, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQTUsers_TacNhan', err)
            throw err
        }
    }

    QTUsers_TacNhan.listDeletedUsers_TacNhan = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              QTUsers_TacNhan.find({
                where: {queryData},
                include: ['belongsToQTUsers', 'belongsToQTTacNhan'],
                limit: pageSize,
                skip: page
              }),
              QTUsers_TacNhan.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTTacNhan, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQTUsers_TacNhan', err)
            throw err
        }
    }

    QTUsers_TacNhan.remoteMethod(
        'createUsers_TacNhan', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'qtUsersId', type: 'number'},
                {arg: 'qtTacNhanId', type: 'number'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers_TacNhan.remoteMethod(
        'updateUsers_TacNhan', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'qtUsersId', type: 'number'},
                {arg: 'qtTacNhanId', type: 'number'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers_TacNhan.remoteMethod(
        'deleteUsers_TacNhan', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers_TacNhan.remoteMethod(
        'restoreUsers_TacNhan', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers_TacNhan.remoteMethod(
        'readUsers_TacNhan', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers_TacNhan.remoteMethod(
        'listUsers_TacNhan', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers_TacNhan.remoteMethod(
        'listDeletedUsers_TacNhan', {
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