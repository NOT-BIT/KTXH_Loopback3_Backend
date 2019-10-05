module.exports = function(QCHuyen) {
    const Promise = require('bluebird')
    let queryObject = require("../../utils/query-object")

    QCHuyen.createHuyen = async function(uid, ma, qcTinhId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk){
        const huyenData = {
            uid: uid,
            ma: ma,
            qcTinhId: qcTinhId,
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
            const data = await QCHuyen.create(huyenData)
            return data
        } catch (err) {
            console.log('createQCHuyen', err)
            throw err
        }
    }

    QCHuyen.updateHuyen = async function(id, ma, qcTinhId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        const huyenData = {
            id: id,
            ma: ma,
            qcTinhId: qcTinhId,
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
            const data = await QCHuyen.upsertWithWhere({id: huyenData.id, xoa: false}, huyenData)
            return data
        } catch (err) {
            console.log('updateQCHuyen', err)
            throw err
        }
    }

    QCHuyen.deleteHuyen = async function(id){
        try {
            const data = await QCHuyen.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQCHuyen', err)
            throw err
        }
    }
    
    QCHuyen.restoreHuyen = async function(id){
        try {
            const data = await QCHuyen.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQCHuyen', err)
            throw err
        }
    }

    QCHuyen.readHuyen = async function(id){
        try {
            const data = await QCHuyen.findOne({where: {id: id, xoa: false}})
            return data
        } catch (err) {
            console.log('readQCHuyen', err)
            throw err
        }
    }

    QCHuyen.listHuyen = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 0
            const [data, total] = await Promise.all([
                QCHuyen.find({
                where: {queryData},
                include: ['belongsToQCTinh', 'belongsToSysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCHuyen.count({xoa: false})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QCHuyen, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQCHuyen', err)
            throw err
        }
    }

    QCHuyen.listDeletedHuyen = async function(queryData, page, pageSize){
        try {
            queryData.xoa = 1
            const [data, total] = await Promise.all([
              QCHuyen.find({
                where: {queryData},
                include: ['belongsToQCTinh', 'belongsToSysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCHuyen.count({xoa: true})
            ])
            return {
              rows: queryObject.listAPIReturnsList(QCHuyen, data),
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQCHuyen', err)
            throw err
        }
    }

    QCHuyen.remoteMethod(
        'createHuyen', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'qcTinhId', type: 'number', required: true},
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

    QCHuyen.remoteMethod(
        'updateHuyen', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'qcTinhId', type: 'number'},
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

    QCHuyen.remoteMethod(
        'deleteHuyen', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCHuyen.remoteMethod(
        'restoreHuyen', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCHuyen.remoteMethod(
        'readHuyen', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCHuyen.remoteMethod(
        'listHuyen', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCHuyen.remoteMethod(
        'listDeletedHuyen', {
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