app = require('../../../server/server')
let to = require('await-to-js').to

'use strict';

module.exports = function(ChiTieuPhanTo){
    ChiTieuPhanTo.createCTPT = async function(uid, ma, ten, ghiChu){
        let [err, CTPT] = await to(ChiTieuPhanTo.findOne({where: {ma: ma}}))
        if (err||CTPT != null) {
            return [400, 'ma chi tieu phan to nay da ton tai']
        }
        let CTPTdata = {
            uid: uid,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            hieuLuc: 1,
            xoa: 0
        }
        let [errCreate, data] = await to(ChiTieuPhanTo.create(CTPTdata))
        if (errCreate||!data) {
            return [400, 'create fail']
        }
        return [200, 'create success']
    }

    ChiTieuPhanTo.updateCTPT = async function(id, ma, ten, ghiChu, hieuLuc){
        let [err, CTPT] = await to(ChiTieuPhanTo.findOne({where: {id: id}}))
        if (err||CTPT == null) {
            return [404, 'chi tieu phan to khong ton tai']
        }
        if (CTPT.xoa == 1){
            return [400, 'chi tieu phan to da bi xoa']
        }
        if (ma != null){
            let [err2, CTPT2] = await to(ChiTieuPhanTo.findOne({where: {ma: ma}}))
            if (err2||CTPT2 != null) {
                return [400, 'da ton tai ma chi tieu phan to nay']
            }
        }
        let CTPTdata = {
            id: id,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc
        }
        let [errUpdate, CTPTUpdate] = await to(ChiTieuPhanTo.upsert(CTPTdata))
        if (errUpdate || !CTPTUpdate) {
            return [400, 'update fail']
        }
        return [200, 'update success']
    }

    ChiTieuPhanTo.deleteCTPT = async function(id){
        let [err, CTPT] = await to(ChiTieuPhanTo.findOne({where: {id: id}}))
        if (err||CTPT == null) {
            return [404, 'chi tieu phan to khong ton tai']
        }
        if (CTPT.xoa == 1){
            return [400, 'chi tieu phan to da bi xoa']
        }
        let [errDelete, CTPTDelete] = await to(ChiTieuPhanTo.upsertWithWhere({id: id}, {xoa: 1}))
        if (errDelete || !CTPTDelete) {
            return [400, 'delete fail']
        }
        return [200, 'delete success']
    }
    
    ChiTieuPhanTo.restoreCTPT = async function(id){
        let [err, CTPT] = await to(ChiTieuPhanTo.findOne({where: {id: id}}))
        if (err||CTPT == null) {
            return [404, 'chi tieu phan to khong ton tai']
        }
        if (CTPT.xoa == 0){
            return [400, 'chi tieu phan to khong bi xoa']
        }
        let [errRestore, CTPTRestore] = await to(ChiTieuPhanTo.upsertWithWhere({id: id}, {xoa: 0}))
        if (errRestore || !CTPTRestore) {
            return [400, 'restore fail']
        }
        return [200, 'restore success']
    }

    ChiTieuPhanTo.readCTPT = async function(id){
        let [err, CTPT] = await to(ChiTieuPhanTo.findOne({where: {id: id}}))
        if (err||CTPT == null) {
            return [404, 'chi tieu phan to khong ton tai', CTPT]
        }
        return [200, 'thong tin cua chi tieu phan to', CTPT]
    }

    ChiTieuPhanTo.listCTPT = async function(ma, ten, ghiChu, hieuLuc){
        let [err, CTPTArr] = await to(ChiTieuPhanTo.find({where: {xoa: 0}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: 20, skip: 0}))
        if (err||CTPTArr == null) {
            return [404, 'khong ton tai', CTPTArr]
        }
        return [200, 'danh sach chi tieu phan to', CTPTArr]
    }

    ChiTieuPhanTo.listDeletedCTPT = async function(ma, ten, ghiChu, hieuLuc){
        let [err, CTPTArr] = await to(ChiTieuPhanTo.find({where: {xoa: 1}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: 20, skip: 0}))
        if (err||CTPTArr == null) {
            return [404, 'khong ton tai', CTPTArr]
        }
        return [200, 'danh sach chi tieu phan to da bi xoa', CTPTArr]
    }

    ChiTieuPhanTo.remoteMethod(
        'createCTPT', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'}
            ],
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'updateCTPT', {
            http: {path: '/:id/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'}
            ],
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'deleteCTPT', {
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

    ChiTieuPhanTo.remoteMethod(
        'restoreCTPT', {
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

    ChiTieuPhanTo.remoteMethod(
        'readCTPT', {
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

    ChiTieuPhanTo.remoteMethod(
        'listCTPT', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'},
                {arg: 'result', type: 'array'}
            ],
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'listDeletedCTPT', {
            http: {path: '/deleted_list', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
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