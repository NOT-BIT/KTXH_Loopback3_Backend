module.exports = function(BieuNhapLieu_TruongNhapLieu) {
    const Promise = require('bluebird')

    BieuNhapLieu_TruongNhapLieu.createBT = async function(uid, ma, ten, bieuNhapLieuId, truongNhapLieuId, ghiChu){
        const BTData = {
            uid: uid,
            ma: ma,
            ten: ten,
            bieuNhapLieuId: bieuNhapLieuId,
            truongNhapLieuId: truongNhapLieuId,
            ghiChu: ghiChu,
            hieuLuc: 1,
            xoa: 0
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
        try {
            const BT = await BieuNhapLieu_TruongNhapLieu.findById(id)
            if (BT.xoa == 1){
                return null
            }
            const BTData = {
                id: id,
                ma: ma,
                ten: ten,
                bieuNhapLieuId: bieuNhapLieuId,
                truongNhapLieuId: truongNhapLieuId,
                ghiChu: ghiChu,
                hieuLuc: hieuLuc
            }
            try {
                const data = await BieuNhapLieu_TruongNhapLieu.upsertWithWhere({id: BTData.id}, BTData)
                return data
            } catch (err) {
                console.log('updateBieuNhapLieu_TruongNhapLieu', err)
                throw err
            }
        } catch (err) {
            console.log('findBT', err)
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
            const data = await BieuNhapLieu_TruongNhapLieu.findById(id, {where: {xoa: false}})
            return data
        } catch (err) {
            console.log('readBieuNhapLieu_TruongNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu_TruongNhapLieu.listBT= async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
                BieuNhapLieu_TruongNhapLieu.find({
                where: {xoa: 0},
                fields: {ma: true, ten: true, ghiChu: true, bieuNhapLieuId: true, truongNhapLieuId: true, hieuLuc: true},
                include: ['BieuNhapLieu', 'TruongNhapLieu'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu_TruongNhapLieu.count({xoa: false})
            ])
            return {
              rows: data,
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
            const [data, total] = await Promise.all([
              BieuNhapLieu_TruongNhapLieu.find({
                where: {xoa: 1},
                fields: {ma: true, ten: true, ghiChu: true, bieuNhapLieuId: true, truongNhapLieuId: true, hieuLuc: true},
                include: ['BieuNhapLieu', 'TruongNhapLieu'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu_TruongNhapLieu.count({xoa: true})
            ])
            return {
              rows: data,
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
                {arg: 'ten', type: 'string', required: false},
                {arg: 'bieuNhapLieuId', type: 'number', required: true},
                {arg: 'truongNhapLieuId', type: 'number', required: true},
                {arg: 'ghiChu', type: 'string', required: false}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu_TruongNhapLieu.remoteMethod(
        'updateBT', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'bieuNhapLieuId', type: 'number', required: false},
                {arg: 'truongNhapLieuId', type: 'number', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
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
                {arg: 'queryData', type: 'object', required: false},
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
                {arg: 'queryData', type: 'object', required: false},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )
}