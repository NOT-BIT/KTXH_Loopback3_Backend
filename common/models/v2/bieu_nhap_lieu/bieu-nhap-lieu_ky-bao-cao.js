module.exports = function(BieuNhapLieu_KyBaoCao) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    BieuNhapLieu_KyBaoCao.createBK = async function(uid, ma, bieuNhapLieuId, qlKyBaoCaoId, ten, ghiChu){
        const BKData = {
            uid: uid,
            ma: ma,
            bieuNhapLieuId: bieuNhapLieuId,
            qlKyBaoCaoId: qlKyBaoCaoId,
            ten: ten,
            ghiChu: ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await BieuNhapLieu_KyBaoCao.create(BKData)
            return data
        } catch (err) {
            console.log('createBieuNhapLieu_KyBaoCao', err)
            throw err
        }
    }

    BieuNhapLieu_KyBaoCao.updateBK = async function(id, ma, bieuNhapLieuId, qlKyBaoCaoId, ten, ghiChu, hieuLuc){
       const BKData = {
            id: id,
            ma: ma,
            bieuNhapLieuId: bieuNhapLieuId,
            qlKyBaoCaoId: qlKyBaoCaoId,
            ten: ten,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await BieuNhapLieu_KyBaoCao.upsertWithWhere({id: BKData.id, xoa: false}, BKData)
            return data
        } catch (err) {
            console.log('updateBieuNhapLieu_KyBaoCao', err)
            throw err
        }
    }

    BieuNhapLieu_KyBaoCao.deleteBK = async function(id){
        try {
            const data = await BieuNhapLieu_KyBaoCao.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteBieuNhapLieu_KyBaoCao', err)
            throw err
        }
    }

    BieuNhapLieu_KyBaoCao.restoreBK = async function(id){
        try {
            const data = await BieuNhapLieu_KyBaoCao.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreBieuNhapLieu_KyBaoCao', err)
            throw err
        }
    }

    BieuNhapLieu_KyBaoCao.readBK = async function(id){
        try {
            const data = await BieuNhapLieu_KyBaoCao.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readBieuNhapLieu_KyBaoCao', err)
            throw err
        }
    }

    BieuNhapLieu_KyBaoCao.listBK= async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
                BieuNhapLieu_KyBaoCao.find({
                where: {queryData},
                include: ['belongsToBieuNhapLieu', 'belongsToQLKyBaoCao'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu_KyBaoCao.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(BieuNhapLieu_KyBaoCao, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listBieuNhapLieu_KyBaoCao', err)
            throw err
        }
    }

    BieuNhapLieu_KyBaoCao.listDeletedBK = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              BieuNhapLieu_KyBaoCao.find({
                where: {queryData},
                include: ['belongsToBieuNhapLieu', 'belongsToQLKyBaoCao'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu_KyBaoCao.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(BieuNhapLieu_KyBaoCao, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedBieuNhapLieu_KyBaoCao', err)
            throw err
        }
    }

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'createBK', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'bieuNhapLieuId', type: 'number', required: true},
                {arg: 'qlKyBaoCaoId', type: 'number', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'updateBK', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'bieuNhapLieuId', type: 'number'},
                {arg: 'qlKyBaoCaoId', type: 'number'},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'deleteBK', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'restoreBK', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'readBK', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'listBK', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'listDeletedBK', {
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