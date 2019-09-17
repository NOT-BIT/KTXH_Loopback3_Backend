let to = require('await-to-js').to;

'use strict';

module.exports = function(QCTinh) {
    QCTinh.createTinh = async function(uid, ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk){
        let [err1, tinh1] = await to(QCTinh.findOne({where: {uid: uid}}))
        if (err1||tinh1 != null) {
            return [400, 'uid tinh da ton tai']
        }
        let [err2, tinh2] = await to(QCTinh.findOne({where: {ma: ma}}))
        if (err2||tinh2 != null) {
            return [400, 'ma tinh da ton tai']
        }
        let tinhData = {
            uid: uid,
            ma: ma,
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
        let [errCreate, data] = await to(QCTinh.create(tinhData))
        if (errCreate||!data) {
            return [400, 'create fail']
        }
        return [200, 'create success']
    }

    QCTinh.updateTinh = async function(id, ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (err||tinh == null) {
            return [404, 'tinh khong ton tai']
        }
        if (tinh.xoa == 1){
            return [400, 'tinh da bi xoa']
        }
        if (ma != null){
            let [err2, tinh2] = await to(QCTinh.findOne({where: {ma: ma}}))
            if (err2||tinh2 != null) {
                return [400, 'da ton tai ma tinh nay']
            }
        }
        let tinhData = {
            id: id,
            ma: ma,
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
        let [errUpdate, tinhUpdate] = await to(QCTinh.upsert(tinhData))
        if (errUpdate || !tinhUpdate) {
            return [400, 'update fail']
        }
        return [200, 'update success']
    }

    QCTinh.deleteTinh = async function(id){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (err||tinh == null) {
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
        if (err||tinh == null) {
            return [404, 'tinh khong ton tai']
        }
        if (tinh.xoa == 0){
            return [400, 'tinh khong bi xoa']
        }
        let [errRestore, tinhRestore] = await to(QCTinh.upsertWithWhere({id: id}, {xoa: 0}))
        if (errRestore || !tinhRestore) {
            return [400, 'restore fail']
        }
        return [200, 'restore success']
    }

    QCTinh.readTinh = async function(id){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (err||tinh == null) {
            return [404, 'tinh khong ton tai', tinh]
        }
        return [200, 'thong tin cua tinh', tinh]
    }

    QCTinh.listTinh = async function(ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, tinhArr] = await to(QCTinh.find({where: {xoa: 0}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: 20, skip: 0}))
        if (err||tinhArr == null) {
            return [404, 'khong ton tai', tinhArr]
        }
        return [200, 'danh sach tinh', tinhArr]
    }

    QCTinh.listDeletedTinh = async function(ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, tinhArr] = await to(QCTinh.find({where: {xoa: 1}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: 20, skip: 0}))
        if (err||tinhArr == null) {
            return [404, 'khong ton tai', tinhArr]
        }
        return [200, 'danh sach tinh da bi xoa', tinhArr]
    }

    QCTinh.remoteMethod(
        'createTinh', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
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

    QCTinh.remoteMethod(
        'updateTinh', {
            http: {path: '/:id/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
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

    QCTinh.remoteMethod(
        'deleteTinh', {
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

    QCTinh.remoteMethod(
        'restoreTinh', {
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

    QCTinh.remoteMethod(
        'readTinh', {
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

    QCTinh.remoteMethod(
        'listTinh', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: false},
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

    QCTinh.remoteMethod(
        'listDeletedTinh', {
            http: {path: '/deleted_list', verb: 'post'},
            accepts: [
                {arg: 'ma', type: 'string', required: false},
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