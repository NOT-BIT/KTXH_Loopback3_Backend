app = require('../../../server/server')
let QCHuyen = app.models.QCHuyen
let to = require('await-to-js').to

'use strict';

module.exports = function(QCXa) {
    QCXa.createXa = async function(uid, ma, qcHuyenId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, userID){
        let [err1, xa1] = await to(QCXa.findOne({where: {uid: uid}}))
        if (err1||xa1 != null) {
            return [400, 'uid xa da ton tai']
        }
        let [err2, xa2] = await to(QCXa.findOne({where: {ma: ma}}))
        if (err2||xa2 != null) {
            return [400, 'ma xa da ton tai']
        }
        let QCHuyen = app.models.QCHuyen
        let [errHuyen, huyen] = await to(QCHuyen.findOne({where: {id: qcHuyenId}}))
        if (errHuyen||huyen == null) {
            return [404, 'huyen khong ton tai']
        }
        let cDate = Date()
        let xaData = {
            uid: uid,
            ma: ma,
            qcHuyenId: qcHuyenId,
            ten: ten,
            ghiChu: ghiChu,
            capDonViHanhChinh: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            createdAt: cDate,
            createdBy: userID,
            hieuLuc: 1,
            xoa: 0
        }
        let [errCreate, xaCreate] = await to(QCXa.create(xaData))
        if (errCreate || !xaCreate) {
            return [400, 'create fail']
        }
        return [200, 'create success']
    }

    QCXa.updateXa = async function(id, ma, qcHuyenId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, userID, hieuLuc){
        let [err, xa] = await to(QCXa.findOne({where: {id: id}}))
        if (err||xa == null) {
            return [404, 'xa khong ton tai']
        }
        if (xa.xoa == 1){
            return [400, 'xa da bi xoa']
        }
        if (qcHuyenId != null){
            let QCHuyen = app.models.QCHuyen
            let [errhuyen, huyen] = await to(QCxa.findOne({where: {id: qcHuyenId}}))
            if (errhuyen||huyen == null) {
                return [404, 'huyen khong ton tai']
            }
        }
        if (ma != null){
            let [err2, xa2] = await to(QCXa.findOne({where: {ma: ma}}))
            if (err2||xa2 != null) {
                return [400, 'da ton tai ma xa nay']
            }
        }
        let uDate = Date()
        let xaData = {
            id: id,
            ma: ma,
            qcHuyenId: qcHuyenId,
            ten: ten,
            ghiChu: ghiChu,
            capDonViHanhChinh: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            updatedAt: uDate,
            updatedBy: userID,
            hieuLuc: hieuLuc
        }
        let [errUpdate, xaUpdate] = await to(QCXa.upsert(xaData))
        if (errUpdate || !xaUpdate) {
            return [400, 'update fail']
        }
        return [200, 'update success']
    }

    QCXa.deleteXa = async function(id){
        let [err, xa] = await to(QCXa.findOne({where: {id: id}}))
        if (err||xa == null) {
            return [404, 'xa khong ton tai']
        }
        if (xa.xoa == 1){
            return [400, 'xa da bi xoa']
        }
        let [errDelete, xaDelete] = await to(QCXa.upsertWithWhere({id: id}, {xoa: 1}))
        if (errDelete || !xaDelete) {
            return [400, 'delete fail']
        }
        return [200, 'delete success']
    }
    
    QCXa.restoreXa = async function(id){
        let [err, xa] = await to(QCXa.findOne({where: {id: id}}))
        if (err||xa == null) {
            return [404, 'xa khong ton tai']
        }
        if (xa.xoa == 0){
            return [400, 'xa khong bi xoa']
        }
        let [errRestore, xaRestore] = await to(QCXa.upsertWithWhere({id: id}, {xoa: 0}))
        if (errRestore || !xaRestore) {
            return [400, 'restore fail']
        }
        return [200, 'restore success']
    }

    QCXa.readXa = async function(id, ma, qcHuyenId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, xa] = await to(QCXa.findOne({where: {id: id}}))
        if (err||xa == null) {
            return [404, 'xa khong ton tai', xa]
        }
        return [200, 'thong tin cua xa', xa]
    }

    QCXa.listXa = async function(ma, qcHuyenId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, xaArr] = await to(QCXa.find({where: {xoa: 0}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: 20, skip: 0}))
        if (err||xaArr == null) {
            return [404, 'khong ton tai', xaArr]
        }
        return [200, 'danh sach xa', xaArr]
    }

    QCXa.listDeletedXa = async function(ma, qcHuyenId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, xaArr] = await to(QCXa.find({where: {xoa: 1}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: 20, skip: 0}))
        if (err||xaArr == null) {
            return [404, 'khong ton tai', xaArr]
        }
        return [200, 'danh sach xa da bi xoa', xaArr]
    }

    QCXa.remoteMethod(
        'createXa', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'qcHuyenId', type: 'number', required: true},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'cap', type: 'number', required: false},
                {arg: 'loai', type: 'string', required: true},
                {arg: 'nt', type: 'string', required: false},
                {arg: 'bg', type: 'string', required: false},
                {arg: 'hd', type: 'string', required: false},
                {arg: 'dbkk', type: 'string', required: false},
                {arg: 'userID', type: 'number', required: true}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'}
            ],
        },
    )

    QCXa.remoteMethod(
        'updateXa', {
            http: {path: '/:id/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcHuyenId', type: 'number', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'cap', type: 'number', required: false},
                {arg: 'loai', type: 'string', required: false},
                {arg: 'nt', type: 'string', required: false},
                {arg: 'bg', type: 'string', required: false},
                {arg: 'hd', type: 'string', required: false},
                {arg: 'dbkk', type: 'string', required: false},
                {arg: 'userID', type: 'number', required: true},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'}
            ],
        },
    )

    QCXa.remoteMethod(
        'deleteXa', {
            http: {path: '/:id/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'}
            ],
        },
    )

    QCXa.remoteMethod(
        'restoreXa', {
            http: {path: '/:id/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'}
            ],
        },
    )

    QCXa.remoteMethod(
        'readXa', {
            http: {path: '/:id/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcHuyenId', type: 'number', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'cap', type: 'number', required: false},
                {arg: 'loai', type: 'string', required: false},
                {arg: 'nt', type: 'string', required: false},
                {arg: 'bg', type: 'string', required: false},
                {arg: 'hd', type: 'string', required: false},
                {arg: 'dbkk', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'},
                {arg: 'result', type: 'object'}
            ],
        },
    )

    QCXa.remoteMethod(
        'listXa', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcHuyenId', type: 'number', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'cap', type: 'number', required: false},
                {arg: 'loai', type: 'string', required: false},
                {arg: 'nt', type: 'string', required: false},
                {arg: 'bg', type: 'string', required: false},
                {arg: 'hd', type: 'string', required: false},
                {arg: 'dbkk', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'},
                {arg: 'result', type: 'array'}
            ],
        },
    )

    QCXa.remoteMethod(
        'listDeletedXa', {
            http: {path: '/:DeletedList', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcHuyenId', type: 'number', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'cap', type: 'number', required: false},
                {arg: 'loai', type: 'string', required: false},
                {arg: 'nt', type: 'string', required: false},
                {arg: 'bg', type: 'string', required: false},
                {arg: 'hd', type: 'string', required: false},
                {arg: 'dbkk', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'},
                {arg: 'result', type: 'array'}
            ],
        },
    )
}