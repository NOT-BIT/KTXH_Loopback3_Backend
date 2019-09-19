app = require('../../../server/server')
let QCHuyen = app.models.QCHuyen
let to = require('await-to-js').to

'use strict';

module.exports = function(QCXa) {
    QCXa.createXa = async function(uid, ma, qcHuyenId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk){
        let [err1, xa1] = await to(QCXa.findOne({where: {uid: uid}}))
        if (err1||xa1 != null) {
            return {
                'statusCode': 400, 
                'message': 'uid xa da ton tai'
            }
        }
        let [err2, xa2] = await to(QCXa.findOne({where: {ma: ma}}))
        if (err2||xa2 != null) {
            return {
                'statusCode': 400, 
                'message': 'ma xa da ton tai'
            }
        }
        let QCHuyen = app.models.QCHuyen
        let [errHuyen, huyen] = await to(QCHuyen.findOne({where: {id: qcHuyenId}}))
        if (errHuyen||huyen == null) {
            return {
                'statusCode': 404, 
                'message': 'xa khong ton tai'
            }
        }
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
            hieuLuc: 1,
            xoa: 0
        }
        let [errCreate, xaCreate] = await to(QCXa.create(xaData))
        if (errCreate || !xaCreate) {
            return {
                'statusCode': 400, 
                'message': 'create fail'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'create success'
        }
    }

    QCXa.updateXa = async function(id, ma, qcHuyenId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, xa] = await to(QCXa.findOne({where: {id: id}}))
        if (err||xa == null) {
            return {
                'statusCode': 404, 
                'message': 'xa khong ton tai'
            }
        }
        if (xa.xoa == 1){
            return {
                'statusCode': 400, 
                'message': 'xa da bi xoa'
            }
        }
        if (qcHuyenId != null){
            let QCHuyen = app.models.QCHuyen
            let [errhuyen, huyen] = await to(QCxa.findOne({where: {id: qcHuyenId}}))
            if (errhuyen||huyen == null) {
                return {
                    'statusCode': 404, 
                    'message': 'huyen khong ton tai'
                }
            }
        }
        if (ma != null){
            let [err2, xa2] = await to(QCXa.findOne({where: {ma: ma}}))
            if (err2||xa2 != null) {
                return {
                    'statusCode': 400, 
                    'message': 'ma xa da ton tai'
                }
            }
        }
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
            hieuLuc: hieuLuc
        }
        let [errUpdate, xaUpdate] = await to(QCXa.upsert(xaData))
        if (errUpdate || !xaUpdate) {
            return {
                'statusCode': 400, 
                'message': 'update fail'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'update success'
        }
    }

    QCXa.deleteXa = async function(id){
        let [err, xa] = await to(QCXa.findOne({where: {id: id}}))
        if (err||xa == null) {
            return {
                'statusCode': 404, 
                'message': 'xa khong ton tai'
            }
        }
        if (xa.xoa == 1){
            return {
                'statusCode': 400, 
                'message': 'xa da bi xoa'
            }
        }
        let [errDelete, xaDelete] = await to(QCXa.upsertWithWhere({id: id}, {xoa: 1}))
        if (errDelete || !xaDelete) {
            return {
                'statusCode': 400, 
                'message': 'delete fail'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'delete success'
        }
    }
    
    QCXa.restoreXa = async function(id){
        let [err, xa] = await to(QCXa.findOne({where: {id: id}}))
        if (err||xa == null) {
            return {
                'statusCode': 404, 
                'message': 'xa khong ton tai'
            }
        }
        if (xa.xoa == 0){
            return {
                'statusCode': 400, 
                'message': 'xa khong bi xoa'
            }
        }
        let [errRestore, xaRestore] = await to(QCXa.upsertWithWhere({id: id}, {xoa: 0}))
        if (errRestore || !xaRestore) {
            return {
                'statusCode': 400, 
                'message': 'restore fail'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'restore success'
        }
    }

    QCXa.readXa = async function(id){
        let [err, xa] = await to(QCXa.findOne({where: {id: id}}))
        if (err||xa == null) {
            return {
                'statusCode': 404, 
                'message': 'xa khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'thong tin cua xa',
            'result': xa
        }
    }

    QCXa.listXa = async function(queryData, page, pageSize){
        let [err, xaArr] = await to(QCXa.find({where: {xoa: 0}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||xaArr == null) {
            return {
                'statusCode': 404, 
                'message': 'ds xa khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'danh sach xa',
            'result': xaArr
        }
    }

    QCXa.listDeletedXa = async function(queryData, page, pageSize){
        let [err, xaArr] = await to(QCXa.find({where: {xoa: 1}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||xaArr == null) {
            return {
                'statusCode': 404, 
                'message': 'ds xa da bi xoa khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'danh sach xa da bi xoa',
            'result': xaArr
        }
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
                {arg: 'cap', type: 'number', required: true},
                {arg: 'loai', type: 'string', required: true},
                {arg: 'nt', type: 'string', required: false},
                {arg: 'bg', type: 'string', required: false},
                {arg: 'hd', type: 'string', required: false},
                {arg: 'dbkk', type: 'string', required: false}
            ],
            returns: [{arg: 'data', type: 'object'}],
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
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCXa.remoteMethod(
        'deleteXa', {
            http: {path: '/:id/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCXa.remoteMethod(
        'restoreXa', {
            http: {path: '/:id/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCXa.remoteMethod(
        'readXa', {
            http: {path: '/:id/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCXa.remoteMethod(
        'listXa', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCXa.remoteMethod(
        'listDeletedXa', {
            http: {path: '/deleted_list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )
}