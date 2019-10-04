module.exports = function(QTDonVi_DiaBan) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    QTDonVi_DiaBan.createDonVi_DiaBan = async function(uid, ma, ten, qtDonviId, qcTinhId, qcHuyenId, qcXaId, tatCaNutCon, ghiChu){
        const DonVi_DiaBanData = {
            uid,
            ma,
            ten,
            qtDonviId,
            qcTinhId,
            qcHuyenId,
            qcXaId,
            tatCaNutCon,
            ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QTDonVi_DiaBan.create(DonVi_DiaBanData)
            return data
        } catch (err) {
            console.log('createQTDonVi_DiaBan', err)
            throw err
        }
    }

    QTDonVi_DiaBan.updateDonVi_DiaBan = async function(id, ma, ten, qtDonviId, qcTinhId, qcHuyenId, qcXaId, tatCaNutCon, ghiChu, hieuLuc){
        const dvdbData = {
            id,
            ma,
            ten,
            qtDonviId,
            qcTinhId,
            qcHuyenId,
            qcXaId,
            tatCaNutCon,
            ghiChu,
            hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await QTDonVi_DiaBan.upsertWithWhere({id: id, xoa: false}, dvdbData)
            return data
        } catch (err) {
            console.log('updateQTDonVi_DiaBan', err)
            throw err
        }
    }

    QTDonVi_DiaBan.deleteDonVi_DiaBan = async function(id){
        try {
            const data = await QTDonVi_DiaBan.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQTDonVi_DiaBan', err)
            throw err
        }
    }

    QTDonVi_DiaBan.restoreDonVi_DiaBan = async function(id){
        try {
            const data = await QTDonVi_DiaBan.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQTDonVi_DiaBan', err)
            throw err
        }
    }

    QTDonVi_DiaBan.readDonVi_DiaBan = async function(id){
        try {
            const data = await QTDonVi_DiaBan.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readQTDonVi_DiaBan', err)
            throw err
        }
    }

    QTDonVi_DiaBan.listDonVi_DiaBan= async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
                QTDonVi_DiaBan.find({
                where: {queryData},
                include: ['belongsToQTDonVi'],
                limit: pageSize,
                skip: page
              }),
              QTDonVi_DiaBan.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTDonVi_DiaBan, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQTDonVi_DiaBan', err)
            throw err
        }
    }

    QTDonVi_DiaBan.listDeletedDonVi_DiaBan = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              QTDonVi_DiaBan.find({
                where: {queryData},
                include: ['belongsToQTDonVi'],
                limit: pageSize,
                skip: page
              }),
              QTDonVi_DiaBan.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QTDonVi_DiaBan, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQTDonVi_DiaBan', err)
            throw err
        }
    }

    QTDonVi_DiaBan.remoteMethod(
        'createDonVi_DiaBan', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'qtDonviId', type: 'number', required: true},
                {arg: 'qcTinhId', type: 'number'},
                {arg: 'qcHuyenId', type: 'number'},
                {arg: 'qcXaId', type: 'number'},
                {arg: 'tatCaNutCon', type: 'number'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    QTDonVi_DiaBan.remoteMethod(
        'updateDonVi_DiaBan', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'qtDonviId', type: 'number'},
                {arg: 'qcTinhId', type: 'number'},
                {arg: 'qcHuyenId', type: 'number'},
                {arg: 'qcXaId', type: 'number'},
                {arg: 'tatCaNutCon', type: 'number'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    QTDonVi_DiaBan.remoteMethod(
        'deleteDonVi_DiaBan', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTDonVi_DiaBan.remoteMethod(
        'restoreDonVi_DiaBan', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTDonVi_DiaBan.remoteMethod(
        'readDonVi_DiaBan', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTDonVi_DiaBan.remoteMethod(
        'listDonVi_DiaBan', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTDonVi_DiaBan.remoteMethod(
        'listDeletedDonVi_DiaBan', {
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