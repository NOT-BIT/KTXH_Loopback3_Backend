app = require('../../../server/server')
let BieuNhapLieu = app.models.BieuNhapLieu
let SysKyBaoCao = app.models.SysKyBaoCao
let to = require('await-to-js').to

'use strict'

module.exports = function(BieuNhapLieu_KyBaoCao) {
    BieuNhapLieu_KyBaoCao.createBK = async function(uid, ma, bieuNhapLieuId, sysKyBaoCaoId, ten, ghiChu){
        let [err, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {uid: uid}}))
        if (err||BK != null) {
            return [400, 'uid da ton tai']
        }
        let [err2, BK2] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {ma: ma}}))
        if (err2||BK2 != null) {
            return [400, 'ma BieuNhapLieu_KyBaoCao da ton tai']
        }
        let BieuNhapLieu = app.models.BieuNhapLieu
        let SysKyBaoCao = app.models.SysKyBaoCao
        let [errBNL, BNL] = await to(BieuNhapLieu.findOne({where: {id: bieuNhapLieuId}}))
        if (errBNL||BNL == null) {
            return [404, 'Bieu Nhap Lieu khong ton tai']
        }
        let [errKBC, KBC] = await to(SysKyBaoCao.findOne({where: {id: sysKyBaoCaoId}}))
        if (errKBC||KBC == null) {
            return [404, 'Ky Bao Cao khong ton tai']
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
        if (errCreate || !BKCreate) {
            console.log(errCreate)
            return [400, 'create fail']
        }
        return [200, 'create success']
    }

    BieuNhapLieu_KyBaoCao.updateBK = async function(id, ma, bieuNhapLieuId, sysKyBaoCaoId, ten, ghiChu, hieuLuc){
        let [err1, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {id: id}}))
        if (err1||BK == null) {
            return [404, 'BieuNhapLieu_KyBaoCao khong ton tai']
        }
        if (BK.xoa == 1){
            return [400, 'BieuNhapLieu_KyBaoCao da bi xoa']
        }
        if (ma != null){
            let [err2, BK2] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {ma: ma}}))
            if (err2||BK2 != null) {
                return [400, 'da ton tai ma BieuNhapLieu_KyBaoCao nay']
            }
        }
        if (bieuNhapLieuId != null){
            let BieuNhapLieu = app.models.BieuNhapLieu
            let [errBNL, BNL] = await to(BieuNhapLieu.findOne({where: {id: bieuNhapLieuId}}))
            if (errBNL||BNL == null) {
                return [404, 'Bieu Nhap Lieu khong ton tai']
            }
        }
        if (sysKyBaoCaoId != null){
            let SysKyBaoCao = app.models.SysKyBaoCao
            let [errKBC, KBC] = await to(SysKyBaoCao.findOne({where: {id: sysKyBaoCaoId}}))
            if (errKBC||KBC == null) {
                return [404, 'Ky Bao Cao khong ton tai']
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
            return [400, 'Update fail']
        }
        return [200, 'Update success']
    }

    BieuNhapLieu_KyBaoCao.deleteBK = async function(id){
        let [err, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {id: id}}))
        if (err||BK == null) {
            return [404, 'BieuNhapLieu_KyBaoCao khong ton tai']
        }
        if (BK.xoa == 1){
            return [400, 'BieuNhapLieu_KyBaoCao da bi xoa']
        }
        let [errDelete, BKDelete] = await to(BieuNhapLieu_KyBaoCao.upsertWithWhere({id: id}, {xoa: 1}))
        if (errDelete || !BKDelete) {
            return [400, 'delete fail']
        }
        return [200, 'delete success']
    }

    BieuNhapLieu_KyBaoCao.restoreBK = async function(id){
        let [err, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {id: id}}))
        if (err||BK == null) {
            return [404, 'BieuNhapLieu_KyBaoCao khong ton tai']
        }
        if (BK.xoa == 0){
            return [400, 'BieuNhapLieu_KyBaoCao khong bi xoa']
        }
        let [errRestore, BKRestore] = await to(BieuNhapLieu_KyBaoCao.upsertWithWhere({id: id}, {xoa: 0}))
        if (errRestore || !BKRestore) {
            return [400, 'Restore fail']
        }
        return [200, 'Restore success']
    }

    BieuNhapLieu_KyBaoCao.readBK = async function(id){
        let [err, BK] = await to(BieuNhapLieu_KyBaoCao.findOne({where: {id: id}}))
        if (err||BK == null) {
            return [404, 'BieuNhapLieu_KyBaoCao khong ton tai', BK]
        }
        return [200, 'thong tin cua BieuNhapLieu_KyBaoCao', BK]
    }

    BieuNhapLieu_KyBaoCao.listBK= async function(queryData, page, pageSize){
        let [err, BKArr] = await to(BieuNhapLieu_KyBaoCao.find({where: {xoa: 0}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||BKArr == null) {
            return [404, 'khong ton tai', BKArr]
        }
        return [200, 'danh sach BieuNhapLieu_KyBaoCao', BKArr]
    }

    BieuNhapLieu_KyBaoCao.listDeletedBK = async function(queryData, page, pageSize){
        let [err, BKArr] = await to(BieuNhapLieu_KyBaoCao.find({where: {xoa: 1}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||BKArr == null) {
            return [404, 'khong ton tai', BKArr]
        }
        return [200, 'danh sach BieuNhapLieu_KyBaoCao da bi xoa', BKArr]
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
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'}
            ],
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
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'}
            ],
        }
    )

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'deleteBK', {
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

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'restoreBK', {
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

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'readBK', {
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

    BieuNhapLieu_KyBaoCao.remoteMethod(
        'listBK', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                { arg: 'page', type: 'number', default: '0'},
                { arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'},
                {arg: 'result', type: 'array'}
            ],
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
            returns: [
                {arg: 'statusCode', type: 'number'},
                {arg: 'message', type: 'string'},
                {arg: 'result', type: 'array'}
            ],
        },
    )
}