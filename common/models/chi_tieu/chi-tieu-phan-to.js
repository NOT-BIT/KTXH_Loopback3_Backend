app = require('../../../server/server')
let to = require('await-to-js').to

'use strict';

module.exports = function(ChiTieuPhanTo){
    ChiTieuPhanTo.createCTPT = async function(uid, ma, ten, ghiChu){
        let [err1, CTPT1] = await to(ChiTieuPhanTo.findOne({where: {uid: uid}}))
        if (err1||CTPT1 != null) {
            return {
                'statusCode': 400, 
                'message': 'uid chi tieu phan to da ton tai'
            }
        }
        let [err2, CTPT2] = await to(ChiTieuPhanTo.findOne({where: {ma: ma}}))
        if (err2||CTPT2 != null) {
            return {
                'statusCode': 400, 
                'message': 'ma chi tieu phan to da ton tai'
            }
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

    ChiTieuPhanTo.updateCTPT = async function(id, ma, ten, ghiChu, hieuLuc){
        let [err, CTPT] = await to(ChiTieuPhanTo.findOne({where: {id: id}}))
        if (err||CTPT == null) {
            return {
                'statusCode': 404, 
                'message': 'chi tieu phan to khong ton tai'
            }
        }
        if (CTPT.xoa == 1){
            return {
                'statusCode': 400, 
                'message': 'chi tieu phan to da bi xoa'
            }
        }
        if (ma != null){
            let [err2, CTPT2] = await to(ChiTieuPhanTo.findOne({where: {ma: ma}}))
            if (err2||CTPT2 != null) {
                return {
                    'statusCode': 400, 
                    'message': 'ma chi tieu phan to da ton tai'
                }
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

    ChiTieuPhanTo.deleteCTPT = async function(id){
        let [err, CTPT] = await to(ChiTieuPhanTo.findOne({where: {id: id}}))
        if (err||CTPT == null) {
            return {
                'statusCode': 404, 
                'message': 'chi tieu phan to khong ton tai'
            }
        }
        if (CTPT.xoa == 1){
            return {
                'statusCode': 400, 
                'message': 'chi tieu phan to da bi xoa'
            }
        }
        let [errDelete, CTPTDelete] = await to(ChiTieuPhanTo.upsertWithWhere({id: id}, {xoa: 1}))
        if (errDelete || !CTPTDelete) {
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
    
    ChiTieuPhanTo.restoreCTPT = async function(id){
        let [err, CTPT] = await to(ChiTieuPhanTo.findOne({where: {id: id}}))
        if (err||CTPT == null) {
            return {
                'statusCode': 404, 
                'message': 'chi tieu phan to khong ton tai'
            }
        }
        if (CTPT.xoa == 0){
            return {
                'statusCode': 400, 
                'message': 'chi tieu phan to khong bi xoa'
            }
        }
        let [errRestore, CTPTRestore] = await to(ChiTieuPhanTo.upsertWithWhere({id: id}, {xoa: 0}))
        if (errRestore || !CTPTRestore) {
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

    ChiTieuPhanTo.readCTPT = async function(id){
        let [err, CTPT] = await to(ChiTieuPhanTo.findOne({where: {id: id}}))
        if (err||CTPT == null) {
            return {
                'statusCode': 404, 
                'message': 'chi tieu phan to khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'thong tin cua chi tieu phan to',
            'result': CTPT
        }
    }

    ChiTieuPhanTo.listCTPT = async function(queryData, page, pageSize){
        let [err, CTPTArr] = await to(ChiTieuPhanTo.find({where: {xoa: 0}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||CTPTArr == null) {
            return {
                'statusCode': 404, 
                'message': 'ds chi tieu phan to khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'danh sach chi tieu phan to',
            'result': CTPTArr
        }
    }

    ChiTieuPhanTo.listDeletedCTPT = async function(queryData, page, pageSize){
        let [err, CTPTArr] = await to(ChiTieuPhanTo.find({where: {xoa: 1}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||CTPTArr == null) {
            return {
                'statusCode': 404, 
                'message': 'ds chi tieu phan to da bi xoa khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'danh sach chi tieu phan to da bi xoa',
            'result': CTPTArr
        }
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
            returns: [{arg: 'data', type: 'object'}],
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
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'deleteCTPT', {
            http: {path: '/:id/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'restoreCTPT', {
            http: {path: '/:id/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'readCTPT', {
            http: {path: '/:id/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'listCTPT', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    ChiTieuPhanTo.remoteMethod(
        'listDeletedCTPT', {
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