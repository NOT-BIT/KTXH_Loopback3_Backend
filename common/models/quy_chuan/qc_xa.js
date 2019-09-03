let to = require('await-to-js').to
app = require('../../../server/server')
let QCHuyen = app.models.QCHuyen

'use strict';

module.exports = function(QCXa) {
    QCXa.createXa = async function(ma, qcHuyenId, ten){
        let QCHuyen = app.models.QCHuyen
        let [errXa, xa] = await to(QCXa.findOne({where: {ma: ma}}))
        if (xa != null) {
            return [400, 'ma xa da ton tai']
        }
        let [errHuyen, huyen] = await to(QCHuyen.findOne({where: {id: qcHuyenId}}))
        if (huyen == null) {
            return [404, 'huyen khong ton tai']
        }
        let xaData = {
            ma: ma,
            qcHuyenId: qcHuyenId,
            ten: ten,
            hieuLuc: 1,
            xoa: 0
        }
        let [errCreate, xaCreate] = await to(QCXa.create(xaData))
        if (errCreate || !xaCreate) {
            return [400, 'create fail']
        }
        return [200, 'create success']
    }

    QCXa.updateXa = async function(id, ma, qcHuyenId, ten, hieuLuc){
        let [err, xa] = await to(QCXa.findOne({where: {id: id}}))
        let QCHuyen = app.models.QCHuyen
        if (xa == null) {
            return [404, 'xa khong ton tai']
        }
        let [errHuyen, huyen] = await to(QCHuyen.findOne({where: {id: qcHuyenId}}))
        if (huyen == null) {
            return [404, 'huyen khong ton tai']
        }
        // let [err2, xa2] = await to(QCXa.findOne({where: {ma: ma}}))
        // if (xa2 != null) {
        //     return [400, 'da ton tai ma xa nay']
        // }
        let xaData = {
            ma: ma,
            qcHuyenId: qcHuyenId,
            ten: ten,
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
        if (xa == null) {
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
        if (xa == null) {
            return [404, 'xa khong ton tai']
        }
        if (xa.xoa == 0){
            return [400, 'xa khong bi xoa']
        }
        let [errDelete, xaRestore] = await to(QCXa.upsertWithWhere({id: id}, {xoa: 0}))
        if (errDelete || !xaRestore) {
            return [400, 'restore fail']
        }
        return [200, 'restore success']
    }

    QCXa.remoteMethod(
        'createXa', {
            http: {path: '/them-xa', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: true},
                {arg: 'qcHuyenId', type: 'number', required: true},
                {arg: 'ten', type: 'string', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QCXa.remoteMethod(
        'updateXa', {
            http: {path: '/:id/sua-xa', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcHuyenId', type: 'number', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QCXa.remoteMethod(
        'deleteXa', {
            http: {path: '/xoa-xa', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QCXa.remoteMethod(
        'restoreXa', {
            http: {path: '/khoi-phuc-xa', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )
}