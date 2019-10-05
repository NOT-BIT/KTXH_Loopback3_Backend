module.exports = function(QTUsers) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    QTUsers.createUsers = async function(uid, ma, ten, matKhau, soDienThoai, email, qtDonViId, ghiChu){
        const userData = {
            uid, ma, ten, matKhau, soDienThoai, email, qtDonViId, ghiChu,
            hieuLuc: 1,
            xoa: 0,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QTUsers.create(userData)
            return data
        } catch (err) {
            console.log('createQTUsers', err)
            throw err
        }
    }

    QTUsers.updateUsers = async function(id, ma, ten, matKhau, soDienThoai, email, qtDonViId, ghiChu, hieuLuc){
        const userData = {
            id, ma, ten, matKhau, soDienThoai, email, qtDonViId, ghiChu,
            hieuLuc: hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await QTUsers.upsertWithWhere({id: userData.id, xoa: false}, userData)
            return data
        } catch (err) {
            console.log('updateQTUsers', err)
            throw err
        }
    }

    QTUsers.deleteUsers = async function(id){
        try {
            const data = await QTUsers.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQTUsers', err)
            throw err
        }
    }
    
    QTUsers.restoreUsers = async function(id){
        try {
            const data = await QTUsers.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQTUsers', err)
            throw err
        }
    }

    QTUsers.readUsers = async function(id){
        try {
            const data = await QTUsers.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readQTUsers', err)
            throw err
        }
    }

    QTUsers.listUsers = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
              QTUsers.find({
                where: {queryData},
                include: ['belongsToQTDonVi'],
                limit: pageSize,
                skip: page
              }),
              QTUsers.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTUsers, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQTUsers', err)
            throw err
        }
    }

    QTUsers.listDeletedUsers = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              QTUsers.find({
                where: {queryData},
                include: ['belongsToQTDonVi'],
                limit: pageSize,
                skip: page
              }),
              QTUsers.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTUsers, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQTUsers', err)
            throw err
        }
    }

    QTUsers.remoteMethod(
        'createUsers', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'matKhau', type: 'string'},
                {arg: 'soDienThoai', type: 'string'},
                {arg: 'email', type: 'string'},
                {arg: 'qtDonViId', type: 'number'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers.remoteMethod(
        'updateUsers', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'matKhau', type: 'string'},
                {arg: 'soDienThoai', type: 'string'},
                {arg: 'email', type: 'string'},
                {arg: 'qtDonViId', type: 'number'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers.remoteMethod(
        'deleteUsers', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers.remoteMethod(
        'restoreUsers', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers.remoteMethod(
        'readUsers', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers.remoteMethod(
        'listUsers', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers.remoteMethod(
        'listDeletedUsers', {
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