app = require('../../../server/server')
let QCTinh = app.models.QCTinh
let to = require('await-to-js').to

'use strict';

module.exports = function(QCHuyen) {
    QCHuyen.createHuyen = async function(uid, ma, qcTinhId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk){
        let [err1, huyen1] = await to(QCHuyen.findOne({where: {uid: uid}}))
        if (err1||huyen1 != null) {
            return [400, 'uid huyen da ton tai']
        }
        let [err2, huyen2] = await to(QCHuyen.findOne({where: {ma: ma}}))
        if (err2||huyen2 != null) {
            return [400, 'ma huyen da ton tai']
        }
        let QCTinh = app.models.QCTinh
        let [errTinh, tinh] = await to(QCTinh.findOne({where: {id: qcTinhId}}))
        if (errTinh||tinh == null) {
            return [404, 'tinh khong ton tai']
        }
        let huyenData = {
            uid: uid,
            ma: ma,
            qcTinhId: qcTinhId,
            ten: ten,
            ghiChu: ghiChu,
            capDonViHanhChinh: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            hieuLuc: 1,
            xoa: 0
        }
        let [errCreate, huyenCreate] = await to(QCHuyen.create(huyenData))
        if (errCreate || !huyenCreate) {
            return [400, 'create fail']
        }
        return [200, 'create success']
    }

    QCHuyen.updateHuyen = async function(id, ma, qcTinhId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, huyen] = await to(QCHuyen.findOne({where: {id: id}}))
        if (err||huyen == null) {
            return [404, 'huyen khong ton tai']
        }
        if (huyen.xoa == 1){
            return [400, 'huyen da bi xoa']
        }
        if (qcTinhId != null){
            let QCTinh = app.models.QCTinh
            let [errTinh, tinh] = await to(QCTinh.findOne({where: {id: qcTinhId}}))
            if (errTinh||tinh == null) {
                return [404, 'tinh khong ton tai']
            }
        }
        if (ma != null){
            let [err2, huyen2] = await to(QCHuyen.findOne({where: {ma: ma}}))
            if (err2||huyen2 != null) {
                return [400, 'da ton tai ma huyen nay']
            }
        }
        let huyenData = {
            id: id,
            ma: ma,
            qcTinhId: qcTinhId,
            ten: ten,
            ghiChu: ghiChu,
            capDonViHanhChinh: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            hieuLuc: hieuLuc
        }
        let [errUpdate, huyenUpdate] = await to(QCHuyen.upsert(huyenData))
        if (errUpdate || !huyenUpdate) {
            return [400, 'update fail']
        }
        return [200, 'update success']
    }

    QCHuyen.deleteHuyen = async function(id){
        let [err, huyen] = await to(QCHuyen.findOne({where: {id: id}}))
        if (err||huyen == null) {
            return [404, 'huyen khong ton tai']
        }
        if (huyen.xoa == 1){
            return [400, 'huyen da bi xoa']
        }
        let [errDelete, huyenDelete] = await to(QCHuyen.upsertWithWhere({id: id}, {xoa: 1}))
        if (errDelete || !huyenDelete) {
            return [400, 'delete fail']
        }
        return [200, 'delete success']
    }
    
    QCHuyen.restoreHuyen = async function(id){
        let [err, huyen] = await to(QCHuyen.findOne({where: {id: id}}))
        if (err||huyen == null) {
            return [404, 'huyen khong ton tai']
        }
        if (huyen.xoa == 0){
            return [400, 'huyen khong bi xoa']
        }
        let [errRestore, huyenRestore] = await to(QCHuyen.upsertWithWhere({id: id}, {xoa: 0}))
        if (errRestore || !huyenRestore) {
            return [400, 'restore fail']
        }
        return [200, 'restore success']
    }

    QCHuyen.readHuyen = async function(id){
        let [err, huyen] = await to(QCHuyen.findOne({where: {id: id}}))
        if (err||huyen == null) {
            return [404, 'huyen khong ton tai', huyen]
        }
        return [200, 'thong tin cua huyen', huyen]
    }

    QCHuyen.listHuyen = async function(ma, qcTinhId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, huyenArr] = await to(QCHuyen.find({where: {xoa: 0}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: 20, skip: 0}))
        if (err||huyenArr == null) {
            return [404, 'khong ton tai', huyenArr]
        }
        return [200, 'danh sach huyen', huyenArr]
    }

    QCHuyen.listDeletedHuyen = async function(ma, qcTinhId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, huyenArr] = await to(QCHuyen.find({where: {xoa: 1}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: 20, skip: 0}))
        if (err||huyenArr == null) {
            return [404, 'khong ton tai', huyenArr]
        }
        return [200, 'danh sach huyen da bi xoa', huyenArr]
    }

    QCHuyen.remoteMethod(
        'createHuyen', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'qcTinhId', type: 'number', required: true},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'cap', type: 'number', required: true},
                {arg: 'loai', type: 'string', required: true},
                {arg: 'nt', type: 'string', required: false},
                {arg: 'bg', type: 'string', required: false},
                {arg: 'hd', type: 'string', required: false},
                {arg: 'dbkk', type: 'string', required: false}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'}
            ],
        },
    )

    QCHuyen.remoteMethod(
        'updateHuyen', {
            http: {path: '/:id/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcTinhId', type: 'number', required: false},
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
                {arg: 'message', type: 'string'}
            ],
        },
    )

    QCHuyen.remoteMethod(
        'deleteHuyen', {
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

    QCHuyen.remoteMethod(
        'restoreHuyen', {
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

    QCHuyen.remoteMethod(
        'readHuyen', {
            http: {path: '/:id/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'},
                {arg: 'result', type: 'object'}
            ],
        },
    )

    QCHuyen.remoteMethod(
        'listHuyen', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcTinhId', type: 'number', required: false},
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

    QCHuyen.remoteMethod(
        'listDeletedHuyen', {
            http: {path: '/deleted_list', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcTinhId', type: 'number', required: false},
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