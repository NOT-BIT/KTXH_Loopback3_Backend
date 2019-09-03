app = require('../../../server/server')
let QCTinh = app.models.QCTinh
let to = require('await-to-js').to

'use strict';

module.exports = function(QCHuyen) {
    QCHuyen.createHuyen = async function(ma, qcTinhId, ten){
        let QCTinh = app.models.QCTinh
        let [errHuyen, huyen] = await to(QCHuyen.findOne({where: {ma: ma}}))
        if (huyen != null) {
            return [400, 'ma huyen da ton tai']
        }
        let [errTinh, tinh] = await to(QCTinh.findOne({where: {id: qcTinhId}}))
        if (tinh == null) {
            return [404, 'tinh khong ton tai']
        }
        let huyenData = {
            ma: ma,
            qcTinhId: qcTinhId,
            ten: ten,
            hieuLuc: 1,
            xoa: 0
        }
        let [errCreate, huyenCreate] = await to(QCHuyen.create(huyenData))
        if (errCreate || !huyenCreate) {
            return [400, 'create fail']
        }
        return [200, 'create success']
    }

    QCHuyen.updateHuyen = async function(id, ma, qcTinhId, ten, hieuLuc){
        let [err, huyen] = await to(QCHuyen.findOne({where: {id: id}}))
        let QCTinh = app.models.QCTinh
        if (huyen == null) {
            return [404, 'huyen khong ton tai']
        }
        let [errTinh, tinh] = await to(QCTinh.findOne({where: {id: qcTinhId}}))
        if (tinh == null) {
            return [404, 'tinh khong ton tai']
        }
        if (ma != null){
            let [err2, huyen2] = await to(QCHuyen.findOne({where: {ma: ma}}))
            if (huyen2 != null) {
                return [400, 'da ton tai ma huyen nay']
            }
        }
        let huyenData = {
            id: id,
            ma: ma,
            qcTinhId: qcTinhId,
            ten: ten,
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
        if (huyen == null) {
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
        if (huyen == null) {
            return [404, 'huyen khong ton tai']
        }
        if (huyen.xoa == 0){
            return [400, 'huyen khong bi xoa']
        }
        let [errDelete, huyenRestore] = await to(QCHuyen.upsertWithWhere({id: id}, {xoa: 0}))
        if (errDelete || !huyenRestore) {
            return [400, 'restore fail']
        }
        return [200, 'restore success']
    }


    QCHuyen.remoteMethod(
        'createHuyen', {
            http: {path: '/them-huyen', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: true},
                {arg: 'qcTinhId', type: 'number', required: true},
                {arg: 'ten', type: 'string', required: true},
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QCHuyen.remoteMethod(
        'updateHuyen', {
            http: {path: '/:id/sua-huyen', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcTinhId', type: 'number', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QCHuyen.remoteMethod(
        'deleteHuyen', {
            http: {path: '/xoa-huyen', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QCHuyen.remoteMethod(
        'restoreHuyen', {
            http: {path: '/khoi-phuc-huyen', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )
}