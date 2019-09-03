let to = require('await-to-js').to;

'use strict';

module.exports = function(QCTinh) {
    QCTinh.createTinh = async function(ma, ten){
        let [err, tinh] = await to(QCTinh.findOne({where: {ma: ma}}))
        if (tinh != null) {
            return [400, 'tinh da ton tai']
        }
        let tinhData = {
            ma: ma,
            ten: ten,
            hieuLuc: 1,
            xoa: 0
        }
        let data = await to(QCTinh.create(tinhData))
        if (!data) {
            return [400, 'create fail']
        }
        return [200, 'create success']
    }

    QCTinh.updateTinh = async function(id, ma, ten, hieuLuc){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (tinh == null) {
            return [404, 'tinh khong ton tai']
        }
        // let [err2, tinh2] = await to(QCTinh.findOne({where: {ma: ma}}))
        // if (tinh2 != null) {
        //     return [400, 'da ton tai ma tinh nay']
        // }
        let tinhData = {
            ma: ma,
            ten: ten,
            hieuLuc: hieuLuc
        }
        let [errUpdate, tinhUpdate] = await to(QCTinh.upsert(tinhData))
        if (errUpdate || !tinhUpdate) {
            return [400, 'update fail']
        }
        return [200, 'update success']
    }

    QCTinh.deleteTinh = async function(id){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (tinh == null) {
            return [404, 'tinh khong ton tai']
        }
        if (tinh.xoa == 1){
            return [400, 'tinh da bi xoa']
        }
        let [errDelete, tinhDelete] = await to(QCTinh.upsertWithWhere({id: id}, {xoa: 1}))
        if (errDelete || !tinhDelete) {
            return [400, 'delete fail']
        }
        return [200, 'delete success']
    }
    
    QCTinh.restoreTinh = async function(id){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (tinh == null) {
            return [404, 'tinh khong ton tai']
        }
        if (tinh.xoa == 0){
            return [400, 'tinh khong bi xoa']
        }
        let [errDelete, tinhRestore] = await to(QCTinh.upsertWithWhere({id: id}, {xoa: 0}))
        if (errDelete || !tinhRestore) {
            return [400, 'restore fail']
        }
        return [200, 'restore success']
    }

    QCTinh.remoteMethod(
        'createTinh', {
            http: {path: '/them-tinh', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QCTinh.remoteMethod(
        'updateTinh', {
            http: {path: '/:id/sua-tinh', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QCTinh.remoteMethod(
        'deleteTinh', {
            http: {path: '/xoa-tinh', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QCTinh.remoteMethod(
        'restoreTinh', {
            http: {path: '/khoi-phuc-tinh', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )
}