module.exports = function(QCTinh) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    QCTinh.createTinh = async function(uid, ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk){
        const tinhData = {
            uid: uid,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            sysCapDonViHanhChinhId: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QCTinh.create(tinhData)
            return data
        } catch (err) {
            console.log('createQCTinh', err)
            throw err
        }
    }

    QCTinh.updateTinh = async function(id, ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        const tinhData = {
            id: id,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            sysCapDonViHanhChinhId: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            hieuLuc: hieuLuc,
            updatedAt: new Date()
        }
        try {
            const data = await QCTinh.upsertWithWhere({id: tinhData.id, xoa: false}, tinhData)
            return data
        } catch (err) {
            console.log('updateQCTinh', err)
            throw err
        }
    }

    QCTinh.deleteTinh = async function(id){
        try {
            const data = await QCTinh.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQCTinh', err)
            throw err
        }
    }
    
    QCTinh.restoreTinh = async function(id){
        try {
            const data = await QCTinh.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQCTinh', err)
            throw err
        }
    }

    QCTinh.readTinh = async function(id){
        try {
            const data = await QCTinh.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readQCTinh', err)
            throw err
        }
    }

    QCTinh.listTinh = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
              QCTinh.find({
                where: {queryData},
                include: ['belongsToSysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCTinh.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QCTinh, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQCTinh', err)
            throw err
        }
    }

    QCTinh.listDeletedTinh = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              QCTinh.find({
                where: {queryData},
                include: ['belongsToSysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCTinh.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QCTinh, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQCTinh', err)
            throw err
        }
    }

    QCTinh.remoteMethod(
        'createTinh', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'cap', type: 'number', required: true},
                {arg: 'loai', type: 'string', required: true},
                {arg: 'nt', type: 'string'},
                {arg: 'bg', type: 'string'},
                {arg: 'hd', type: 'string'},
                {arg: 'dbkk', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'updateTinh', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'cap', type: 'number'},
                {arg: 'loai', type: 'string'},
                {arg: 'nt', type: 'string'},
                {arg: 'bg', type: 'string'},
                {arg: 'hd', type: 'string'},
                {arg: 'dbkk', type: 'string'},
                {arg: 'hieuLuc', type: 'number'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'deleteTinh', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'restoreTinh', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'readTinh', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'listTinh', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'listDeletedTinh', {
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