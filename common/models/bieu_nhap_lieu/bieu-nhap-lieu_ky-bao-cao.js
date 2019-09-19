app = require('../../../server/server')
let BieuNhapLieu = app.models.BieuNhapLieu
let SysKyBaoCao = app.models.SysKyBaoCao
let to = require('await-to-js').to

'use strict'

module.exports = function(BieuNhapLieu_KyBaoCao) {
    BieuNhapLieu_KyBaoCao.createBK = async function(uid, ma, bieuNhapLieuId, sysKyBaoCaoId, ten, ghiChu){
        let [err, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {uid: uid}}))
        if (err||BK != null) {
            return {
                'statusCode': 400, 
                'message': 'uid da ton tai'
            }
        }
        let [err2, BK2] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {ma: ma}}))
        if (err2||BK2 != null) {
            return {
                'statusCode': 400, 
                'message': 'ma BieuNhapLieu_KyBaoCao da ton tai'
            }
        }
        let BieuNhapLieu = app.models.BieuNhapLieu
        let SysKyBaoCao = app.models.SysKyBaoCao
        let [errBNL, BNL] = await to(BieuNhapLieu.findOne({where: {id: bieuNhapLieuId}}))
        if (errBNL||BNL == null) {
            return {
                'statusCode': 404, 
                'message': 'BieuNhapLieu khong ton tai'
            }
        }
        let [errKBC, KBC] = await to(SysKyBaoCao.findOne({where: {id: sysKyBaoCaoId}}))
        if (errKBC||KBC == null) {
            return {
                'statusCode': 404, 
                'message': 'KyBaoCao khong ton tai'
            }
        }
        let BKData = {
            uid: uid,
            ma: ma,
            bieuNhapLieuId: bieuNhapLieuId,
            sysKyBaoCaoId: sysKyBaoCaoId,
            ten: ten,
            ghiChu: ghiChu,
            hieuLuc: 1,
            xoa: 0
        }
        let [errCreate, BKCreate] = await to(BieuNhapLieu_KyBaoCao.create(BKData))
        if (errCreate||!BKCreate) {
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

    BieuNhapLieu_KyBaoCao.updateBK = async function(id, ma, bieuNhapLieuId, sysKyBaoCaoId, ten, ghiChu, hieuLuc){
        let [err1, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {id: id}}))
        if (err1||BK == null) {
            return {
                'statusCode': 404, 
                'message': 'BieuNhapLieu_KyBaoCao khong ton tai'
            }
        }
        if (BK.xoa == 1){
            return {
                'statusCode': 400, 
                'message': 'BieuNhapLieu_KyBaoCao da bi xoa'
            }
        }
        if (ma != null){
            let [err2, BK2] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {ma: ma}}))
            if (err2||BK2 != null) {
                return {
                    'statusCode': 400, 
                    'message': 'ma BieuNhapLieu_KyBaoCao da ton tai'
                }
            }
        }
        if (bieuNhapLieuId != null){
            let BieuNhapLieu = app.models.BieuNhapLieu
            let [errBNL, BNL] = await to(BieuNhapLieu.findOne({where: {id: bieuNhapLieuId}}))
            if (errBNL||BNL == null) {
                return {
                    'statusCode': 404, 
                    'message': 'BieuNhapLieu khong ton tai'
                }
            }
        }
        if (sysKyBaoCaoId != null){
            let SysKyBaoCao = app.models.SysKyBaoCao
            let [errKBC, KBC] = await to(SysKyBaoCao.findOne({where: {id: sysKyBaoCaoId}}))
            if (errKBC||KBC == null) {
                return {
                    'statusCode': 404, 
                    'message': 'KyBaoCao khong ton tai'
                }
            }
        }
        let BKData = {
            id: id,
            ma: ma,
            bieuNhapLieuId: bieuNhapLieuId,
            sysKyBaoCaoId: sysKyBaoCaoId,
            ten: ten,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc
        }
        let [errUpdate, BKUpdate] = await to(BieuNhapLieu_KyBaoCao.upsert(BKData))
        if (errUpdate || !BKUpdate) {
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

    BieuNhapLieu_KyBaoCao.deleteBK = async function(id){
        let [err, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {id: id}}))
        if (err||BK == null) {
            return {
                'statusCode': 404, 
                'message': 'BieuNhapLieu_KyBaoCao khong ton tai'
            }
        }
        if (BK.xoa == 1){
            return {
                'statusCode': 400, 
                'message': 'BieuNhapLieu_KyBaoCao da bi xoa'
            }
        }
        let [errDelete, BKDelete] = await to(BieuNhapLieu_KyBaoCao.upsertWithWhere({id: id}, {xoa: 1}))
        if (errDelete || !BKDelete) {
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

    BieuNhapLieu_KyBaoCao.restoreBK = async function(id){
        let [err, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {id: id}}))
        if (err||BK == null) {
            return {
                'statusCode': 404, 
                'message': 'BieuNhapLieu_KyBaoCao khong ton tai'
            }
        }
        if (BK.xoa == 0){
            return {
                'statusCode': 400, 
                'message': 'BieuNhapLieu_KyBaoCao khong bi xoa'
            }
        }
        let [errRestore, BKRestore] = await to(BieuNhapLieu_KyBaoCao.upsertWithWhere({id: id}, {xoa: 0}))
        if (errRestore || !BKRestore) {
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

    BieuNhapLieu_KyBaoCao.readBK = async function(id){
        let [err, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {id: id}}))
        if (err||BK == null) {
            return {
                'statusCode': 404, 
                'message': 'BieuNhapLieu_KyBaoCao khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'thong tin cua BieuNhapLieu_KyBaoCao',
            'result': BK
        }
    }

    BieuNhapLieu_KyBaoCao.listBK= async function(queryData, page, pageSize){
        let [err, BKArr] = await to(BieuNhapLieu_KyBaoCao.find({where: {xoa: 0}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||BKArr == null) {
            return {
                'statusCode': 404, 
                'message': 'ds BieuNhapLieu_KyBaoCao khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'danh sach cua BieuNhapLieu_KyBaoCao',
            'result': BKArr
        }
    }

    BieuNhapLieu_KyBaoCao.listDeletedBK = async function(queryData, page, pageSize){
        let [err, BKArr] = await to(BieuNhapLieu_KyBaoCao.find({where: {xoa: 1}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||BKArr == null) {
            return {
                'statusCode': 404, 
                'message': 'ds BieuNhapLieu_KyBaoCao da bi xoa khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'danh sach cua BieuNhapLieu_KyBaoCao da bi xoa',
            'result': BKArr
        }
    }

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'createBK', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'bieuNhapLieuId', type: 'number', required: true},
                {arg: 'sysKyBaoCaoId', type: 'number', required: true},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false}
            ],
            returns: [{arg: 'data', type: 'object'}],
        }
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'updateBK', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'bieuNhapLieuId', type: 'number', required: false},
                {arg: 'sysKyBaoCaoId', type: 'number', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [{arg: 'data', type: 'object'}],
        }
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'deleteBK', {
            http: {path: '/:id/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'restoreBK', {
            http: {path: '/:id/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'readBK', {
            http: {path: '/:id/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'listBK', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'listDeletedBK', {
            http: {path: '/deleted_list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )
}