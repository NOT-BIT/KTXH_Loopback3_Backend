module.exports = function(QTChucNangPhanMem) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    QTChucNangPhanMem.createCNPM = async function(uid, ma, ten, chucNangChaId, path, icon, ghiChu){
        const CNPMData = {
            uid,
            ma,
            ten,
            chucNangChaId,
            path,
            icon,
            ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QTChucNangPhanMem.create(CNPMData)
            return data
        } catch (err) {
            console.log('createQTChucNangPhanMem', err)
            throw err
        }
    }

    QTChucNangPhanMem.updateCNPM = async function(id, ma, ten, chucNangChaId, path, icon, ghiChu, hieuLuc){
        const CNPMData = {
            id,
            ma,
            ten,
            chucNangChaId,
            path,
            icon,
            ghiChu,
            hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await QTChucNangPhanMem.upsertWithWhere({id: CNPMData.id, xoa: false}, CNPMData)
            return data
        } catch (err) {
            console.log('updateQTChucNangPhanMem', err)
            throw err
        }
    }

    QTChucNangPhanMem.deleteCNPM = async function(id){
        try {
            const data = await QTChucNangPhanMem.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQTChucNangPhanMem', err)
            throw err
        }
    }

    QTChucNangPhanMem.restoreCNPM = async function(id){
        try {
            const data = await QTChucNangPhanMem.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQTChucNangPhanMem', err)
            throw err
        }
    }

    QTChucNangPhanMem.readCNPM = async function(id){
        try {
            const data = await QTChucNangPhanMem.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readQTChucNangPhanMem', err)
            throw err
        }
    }

    QTChucNangPhanMem.listCNPM= async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
                QTChucNangPhanMem.find({
                where: {queryData},
                include: ['belongsToQTChucNangPhanMem'],
                limit: pageSize,
                skip: page
              }),
              QTChucNangPhanMem.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTChucNangPhanMem, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQTChucNangPhanMem', err)
            throw err
        }
    }

    QTChucNangPhanMem.listDeletedCNPM = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              QTChucNangPhanMem.find({
                where: {queryData},
                include: ['belongsToQTChucNangPhanMem'],
                limit: pageSize,
                skip: page
              }),
              QTChucNangPhanMem.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTChucNangPhanMem, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQTChucNangPhanMem', err)
            throw err
        }
    }

    QTChucNangPhanMem.remoteMethod(
        'createCNPM', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'chucNangChaId', type: 'number'},
                {arg: 'path', type: 'string'},
                {arg: 'icon', type: 'string'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    QTChucNangPhanMem.remoteMethod(
        'updateCNPM', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'chucNangChaId', type: 'number'},
                {arg: 'path', type: 'string'},
                {arg: 'icon', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    QTChucNangPhanMem.remoteMethod(
        'deleteCNPM', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTChucNangPhanMem.remoteMethod(
        'restoreCNPM', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTChucNangPhanMem.remoteMethod(
        'readCNPM', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTChucNangPhanMem.remoteMethod(
        'listCNPM', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTChucNangPhanMem.remoteMethod(
        'listDeletedCNPM', {
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