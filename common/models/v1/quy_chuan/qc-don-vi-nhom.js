module.exports = function(QCDonViNhom) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    QCDonViNhom.createDVN = async function(uid, ma, ten, ghiChu){
        const donViNhomData = {
            uid: uid,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QCDonViNhom.create(donViNhomData)
            return data
        } catch (err) {
            console.log('createQCDonViNhom', err)
            throw err
        }
    }

    QCDonViNhom.updateDVN = async function(id, ma, ten, ghiChu, hieuLuc){
        const donViNhomData = {
            id: id,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await QCDonViNhom.upsertWithWhere({id: donViNhomData.id, xoa: false}, donViNhomData)
            return data
        } catch (err) {
            console.log('updateQCDonViNhom', err)
            throw err
        }
    }

    QCDonViNhom.deleteDVN = async function(id){
        try {
            const data = await QCDonViNhom.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQCDonViNhom', err)
            throw err
        }
    }
    
    QCDonViNhom.restoreDVN = async function(id){
        try {
            const data = await QCDonViNhom.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQCDonViNhom', err)
            throw err
        }
    }

    QCDonViNhom.readDVN = async function(id){
        try {
            const data = await QCDonViNhom.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readQCDonViNhom', err)
            throw err
        }
    }

    QCDonViNhom.listDVN = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
              QCDonViNhom.find({
                where: {queryData},
                limit: pageSize,
                skip: page
              }),
              QCDonViNhom.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QCDonViNhom, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQCDonViNhom', err)
            throw err
        }
    }

    QCDonViNhom.listDeletedDVN = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              QCDonViNhom.find({
                where: {queryData},
                limit: pageSize,
                skip: page
              }),
              QCDonViNhom.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QCDonViNhom, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQCDonViNhom', err)
            throw err
        }
    }

    QCDonViNhom.remoteMethod(
        'createDVN', {
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

    QCDonViNhom.remoteMethod(
        'updateDVN', {
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

    QCDonViNhom.remoteMethod(
        'deleteDVN', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCDonViNhom.remoteMethod(
        'restoreDVN', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCDonViNhom.remoteMethod(
        'readDVN', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCDonViNhom.remoteMethod(
        'listDVN', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCDonViNhom.remoteMethod(
        'listDeletedDVN', {
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