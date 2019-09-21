module.exports = function(QTUsers_TacNhan) {
    const Promise = require('bluebird')

    QTUsers_TacNhan.createUsers_TacNhan = async function(uid, ma, ten, qtUsersId, qtTacNhanId, ghiChu){
        const UTData = {
            uid: uid,
            ma: ma,
            ten: ten,
            qtUsersId: qtUsersId,
            qtTacNhanId: qtTacNhanId,
            ghiChu: ghiChu,
            hieuLuc: 1,
            xoa: 0
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
        try {
            const ut = await QTUsers_TacNhan.findById(id)
            if (ut.xoa == 1){
                return null
            }
            const UTData = {
                id: id,
                ma: ma,
                ten: ten,
                ghiChu: ghiChu,
                qtUsersId: qtUsersId,
                qtTacNhanId: qtTacNhanId,
                hieuLuc: hieuLuc
            }
            try {
                const data = await QTUsers_TacNhan.upsertWithWhere({id: UTData.id}, UTData)
                return data
            } catch (err) {
                console.log('updateQTUsers_TacNhan', err)
                throw err
            }
        } catch (err) {
            console.log('findUsers_TacNhan', err)
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
            const data = await QTUsers_TacNhan.findById(id, {where: {xoa: false}})
            return data
        } catch (err) {
            console.log('readQTUsers_TacNhan', err)
            throw err
        }
    }

    QTUsers_TacNhan.listUsers_TacNhan = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
              QTUsers_TacNhan.find({
                where: {xoa: 0},
                fields: {ma: true, ten: true, ghiChu: true, qtUsersId: true, qtTacNhanId: true, hieuLuc: true},
                include: ['QTUsers', 'QTTacNhan'],
                limit: pageSize,
                skip: page
              }),
              QTUsers_TacNhan.count({xoa: false})
            ])
            return {
              rows: data,
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
            const [data, total] = await Promise.all([
              QTUsers_TacNhan.find({
                where: {xoa: 1},
                fields: {ma: true, ten: true, ghiChu: true, qtUsersId: true, qtTacNhanId: true, hieuLuc: true},
                include: ['QTUsers', 'QTTacNhan'],
                limit: pageSize,
                skip: page
              }),
              QTUsers_TacNhan.count({xoa: true})
            ])
            return {
              rows: data,
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
                {arg: 'ten', type: 'string', required: false},
                {arg: 'qtUsersId', type: 'number', required: false},
                {arg: 'qtTacNhanId', type: 'number', required: false},
                {arg: 'ghiChu', type: 'string', required: false}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTUsers_TacNhan.remoteMethod(
        'updateUsers_TacNhan', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'qtUsersId', type: 'number', required: false},
                {arg: 'qtTacNhanId', type: 'number', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
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
                {arg: 'queryData', type: 'object', required: false},
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
                {arg: 'queryData', type: 'object', required: false},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )
}