module.exports = function(BieuNhapLieu_TruongNhapLieu) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    BieuNhapLieu_TruongNhapLieu.createBT = async function(uid, ma, ten, bieuNhapLieuId, truongNhapLieuId, ghiChu){
        const BTData = {
            uid: uid,
            ma: ma,
            ten: ten,
            bieuNhapLieuId: bieuNhapLieuId,
            truongNhapLieuId: truongNhapLieuId,
            ghiChu: ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await BieuNhapLieu_TruongNhapLieu.create(BTData)
            return data
        } catch (err) {
            console.log('createBieuNhapLieu_TruongNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu_TruongNhapLieu.updateBT = async function(id, ma, ten, bieuNhapLieuId, truongNhapLieuId, ghiChu, hieuLuc){
        const BTData = {
            id: id,
            ma: ma,
            ten: ten,
            bieuNhapLieuId: bieuNhapLieuId,
            truongNhapLieuId: truongNhapLieuId,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await BieuNhapLieu_TruongNhapLieu.upsertWithWhere({id: BTData.id, xoa: false}, BTData)
            return data
        } catch (err) {
            console.log('updateBieuNhapLieu_TruongNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu_TruongNhapLieu.deleteBT = async function(id){
        try {
            const data = await BieuNhapLieu_TruongNhapLieu.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteBieuNhapLieu_TruongNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu_TruongNhapLieu.restoreBT = async function(id){
        try {
            const data = await BieuNhapLieu_TruongNhapLieu.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreBieuNhapLieu_TruongNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu_TruongNhapLieu.readBT = async function(id){
        try {
            const data = await BieuNhapLieu_TruongNhapLieu.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readBieuNhapLieu_TruongNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu_TruongNhapLieu.listBT= async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
                BieuNhapLieu_TruongNhapLieu.find({
                where: {queryData},
                include: ['belongsToBieuNhapLieu', 'belongsToTruongNhapLieu'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu_TruongNhapLieu.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(BieuNhapLieu_TruongNhapLieu, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listBieuNhapLieu_TruongNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu_TruongNhapLieu.listDeletedBT = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              BieuNhapLieu_TruongNhapLieu.find({
                where: {queryData},
                include: ['belongsToTruongNhapLieu', 'belongsToTruongNhapLieu'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu_TruongNhapLieu.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(BieuNhapLieu_TruongNhapLieu, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedBieuNhapLieu_TruongNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu_TruongNhapLieu.remoteMethod(
        'createBT', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'bieuNhapLieuId', type: 'number', required: true},
                {arg: 'truongNhapLieuId', type: 'number', required: true},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu_TruongNhapLieu.remoteMethod(
        'updateBT', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'bieuNhapLieuId', type: 'number'},
                {arg: 'truongNhapLieuId', type: 'number'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu_TruongNhapLieu.remoteMethod(
        'deleteBT', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_TruongNhapLieu.remoteMethod(
        'restoreBT', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_TruongNhapLieu.remoteMethod(
        'readBT', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_TruongNhapLieu.remoteMethod(
        'listBT', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_TruongNhapLieu.remoteMethod(
        'listDeletedBT', {
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