module.exports = function(BieuNhapLieu) {
    const Promise = require('bluebird')

    BieuNhapLieu.createBNL = async function(uid, ma, ten, sysLoaiBieuNhapLieuId, kyHieuBieu, kyBaoCao, donViNhapLieu, donViNhanBaoCao, donViTongHop, ghiChu){
        const BNLData = {
            uid,
            ma,
            ten,
            sysLoaiBieuNhapLieuId,
            kyHieuBieu,
            kyBaoCao,
            donViNhapLieu,
            donViNhanBaoCao,
            donViTongHop,
            ghiChu,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await BieuNhapLieu.create(BNLData)
            return data
        } catch (err) {
            console.log('createBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.updateBNL = async function(id, ma, ten, sysLoaiBieuNhapLieuId, kyHieuBieu, kyBaoCao, donViNhapLieu, donViNhanBaoCao, donViTongHop, ghiChu, hieuLuc){
        try {
            const BNL = await BieuNhapLieu.findById(id)
            if (BNL.xoa == 1){
                return null
            }
            const BNLData = {
                id,
                ma,
                ten,
                sysLoaiBieuNhapLieuId,
                kyHieuBieu,
                kyBaoCao,
                donViNhapLieu,
                donViNhanBaoCao,
                donViTongHop,
                ghiChu,
                hieuLuc
            }
            try {
                const data = await BieuNhapLieu.upsertWithWhere({id: BNLData.id}, BNLData)
                return data
            } catch (err) {
                console.log('updateBieuNhapLieu', err)
                throw err
            }
        } catch (err) {
            console.log('findBNL', err)
            throw err
        }
    }

    BieuNhapLieu.deleteBNL = async function(id){
        try {
            const data = await BieuNhapLieu.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.restoreBNL = async function(id){
        try {
            const data = await BieuNhapLieu.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.readBNL = async function(id){
        try {
            const data = await BieuNhapLieu.findById(id, {where: {xoa: false}})
            return data
        } catch (err) {
            console.log('readBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.listBNL= async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
                BieuNhapLieu.find({
                where: {xoa: 0},
                fields: {ma: true, ten: true, ghiChu: true, sysLoaiBieuNhapLieuId: true, hieuLuc: true},
                include: ['belongsToSysLoaiBieuNhapLieu'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu.count({xoa: false})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.listDeletedBNL = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
              BieuNhapLieu.find({
                where: {xoa: 1},
                fields: {ma: true, ten: true, ghiChu: true, sysLoaiBieuNhapLieuId: true, hieuLuc: true},
                include: ['belongsToSysLoaiBieuNhapLieu'],
                limit: pageSize,
                skip: page
              }),
              BieuNhapLieu.count({xoa: true})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedBieuNhapLieu', err)
            throw err
        }
    }

    BieuNhapLieu.remoteMethod(
        'createBNL', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'sysLoaiBieuNhapLieuId', type: 'number'},
                {arg: 'kyHieuBieu', type: 'string'},
                {arg: 'kyBaoCao', type: 'string'},
                {arg: 'donViNhapLieu', type: 'string'},
                {arg: 'donViNhanBaoCao', type: 'string'},
                {arg: 'donViTongHop', type: 'string'},
                {arg: 'ghiChu', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu.remoteMethod(
        'updateBNL', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'sysLoaiBieuNhapLieuId', type: 'number'},
                {arg: 'kyHieuBieu', type: 'string'},
                {arg: 'kyBaoCao', type: 'string'},
                {arg: 'donViNhapLieu', type: 'string'},
                {arg: 'donViNhanBaoCao', type: 'string'},
                {arg: 'donViTongHop', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'hieuLuc', type: 'boolean'}
            ],
            returns: {arg: 'data', type: 'object'},
        }
    )

    BieuNhapLieu.remoteMethod(
        'deleteBNL', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu.remoteMethod(
        'restoreBNL', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu.remoteMethod(
        'readBNL', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu.remoteMethod(
        'listBNL', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    BieuNhapLieu.remoteMethod(
        'listDeletedBNL', {
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