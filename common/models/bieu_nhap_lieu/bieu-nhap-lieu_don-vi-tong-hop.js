module.exports = function(BieuNhapLieu_DonViTongHop) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    BieuNhapLieu_DonViTongHop.createBD = async function(uid, ma, bieuNhapLieuId, donViId, ten, ghiChu){
        const BDData = {
            uid: uid,
            ma: ma,
            bieuNhapLieuId: bieuNhapLieuId,
            donViId: donViId,
            ten: ten,
            ghiChu: ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await BieuNhapLieu_DonViTongHop.create(BDData)
            return data
        } catch (err) {
            console.log('createBieuNhapLieu_DonViTongHop', err)
            throw err
        }
    }

    BieuNhapLieu_DonViTongHop.updateBD = async function(id, ma, bieuNhapLieuId, donViId, ten, ghiChu, hieuLuc){
       const BDData = {
            id: id,
            ma: ma,
            bieuNhapLieuId: bieuNhapLieuId,
            donViId: donViId,
            ten: ten,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await BieuNhapLieu_DonViTongHop.upsertWithWhere({id: BDData.id, xoa: false}, BDData)
            return data
        } catch (err) {
            console.log('updateBieuNhapLieu_DonViTongHop', err)
            throw err
        }
    }

    BieuNhapLieu_DonViTongHop.deleteBD = async function(id){
        try {
            const data = await BieuNhapLieu_DonViTongHop.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteBieuNhapLieu_DonViTongHop', err)
            throw err
        }
    }

    BieuNhapLieu_DonViTongHop.restoreBD = async function(id){
        try {
            const data = await BieuNhapLieu_DonViTongHop.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreBieuNhapLieu_DonViTongHop', err)
            throw err
        }
    }

    BieuNhapLieu_DonViTongHop.readBD = async function(id){
        try {
            const data = await BieuNhapLieu_DonViTongHop.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readBieuNhapLieu_DonViTongHop', err)
            throw err
        }
    }

    BieuNhapLieu_DonViTongHop.listBD= async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
                BieuNhapLieu_DonViTongHop.find({
                where: {queryData},
                include: ['belongsToBieuNhapLieu', 'belongsToDonViTongHop'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu_DonViTongHop.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(BieuNhapLieu_DonViTongHop, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listBieuNhapLieu_DonViTongHop', err)
            throw err
        }
    }

    BieuNhapLieu_DonViTongHop.listDeletedBD = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              BieuNhapLieu_DonViTongHop.find({
                where: {queryData},
                include: ['belongsToBieuNhapLieu', 'belongsToDonViTongHop'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu_DonViTongHop.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(BieuNhapLieu_DonViTongHop, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedBieuNhapLieu_DonViTongHop', err)
            throw err
        }
    }

    BieuNhapLieu_DonViTongHop.remoteMethod(
        'createBD', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'bieuNhapLieuId', type: 'number', required: true},
                {arg: 'donViId', type: 'number', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu_DonViTongHop.remoteMethod(
        'updateBD', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'bieuNhapLieuId', type: 'number'},
                {arg: 'donViId', type: 'number'},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu_DonViTongHop.remoteMethod(
        'deleteBD', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_DonViTongHop.remoteMethod(
        'restoreBD', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_DonViTongHop.remoteMethod(
        'readBD', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_DonViTongHop.remoteMethod(
        'listBD', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu_DonViTongHop.remoteMethod(
        'listDeletedBD', {
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