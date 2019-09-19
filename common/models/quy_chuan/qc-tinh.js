let to = require('await-to-js').to;

'use strict';

module.exports = function(QCTinh) {
    QCTinh.createTinh = async function(uid, ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk){
        let [err1, tinh1] = await to(QCTinh.findOne({where: {uid: uid}}))
        if (err1||tinh1 != null) {
            return {
                'statusCode': 400, 
                'message': 'uid tinh da ton tai'
            }
        }
        let [err2, tinh2] = await to(QCTinh.findOne({where: {ma: ma}}))
        if (err2||tinh2 != null) {
            return {
                'statusCode': 400, 
                'message': 'ma tinh da ton tai'
            }
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
            console.log(errCreate)
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

    QCTinh.updateTinh = async function(id, ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (err||tinh == null) {
            return {
                'statusCode': 404, 
                'message': 'tinh khong ton tai'
            }
        }
        if (tinh.xoa == 1){
            return {
                'statusCode': 400, 
                'message': 'tinh da bi xoa'
            }
        }
        if (ma != null){
            let [err2, tinh2] = await to(QCTinh.findOne({where: {ma: ma}}))
            if (err2||tinh2 != null) {
                return {
                    'statusCode': 400, 
                    'message': 'ma tinh da ton tai'
                }
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

    QCTinh.deleteTinh = async function(id){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (err||tinh == null) {
            return {
                'statusCode': 404, 
                'message': 'tinh khong ton tai'
            }
        }
        if (tinh.xoa == 1){
            return {
                'statusCode': 400, 
                'message': 'tinh da bi xoa'
            }
        }
        let [errDelete, tinhDelete] = await to(QCTinh.upsertWithWhere({id: id}, {xoa: 1}))
        if (errDelete || !tinhDelete) {
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
    
    QCTinh.restoreTinh = async function(id){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (err||tinh == null) {
            return {
                'statusCode': 404, 
                'message': 'tinh khong ton tai'
            }
        }
        if (tinh.xoa == 0){
            return {
                'statusCode': 400, 
                'message': 'tinh khong bi xoa'
            }
        }
        let [errRestore, tinhRestore] = await to(QCTinh.upsertWithWhere({id: id}, {xoa: 0}))
        if (errRestore || !tinhRestore) {
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

    QCTinh.readTinh = async function(id){
        let [err, tinh] = await to(QCTinh.findOne({where: {id: id}}))
        if (err||tinh == null) {
            return {
                'statusCode': 404, 
                'message': 'tinh khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'thong tin cua tinh',
            'result': tinh
        }
    }

    QCTinh.listTinh = async function(queryData, page, pageSize){
        let [err, tinhArr] = await to(QCTinh.find({where: {xoa: 0}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||tinhArr == null) {
            return {
                'statusCode': 404, 
                'message': 'ds tinh khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'danh sach tinh',
            'result': tinhArr
        }
    }

    QCTinh.listDeletedTinh = async function(queryData, page, pageSize){
        let [err, tinhArr] = await to(QCTinh.find({where: {xoa: 1}, fields: ['ma', 'ten', 'ghiChu', 'hieuLuc'], limit: pageSize, skip: page}))
        if (err||tinhArr == null) {
            return {
                'statusCode': 404, 
                'message': 'ds tinh da bi xoa khong ton tai'
            }
        }
        return {
            'statusCode': 200, 
            'message': 'danh sach tinh da bi xoa',
            'result': tinhArr
        }
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
            returns: [{arg: 'data', type: 'object'}],
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
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCTinh.remoteMethod(
        'deleteTinh', {
            http: {path: '/:id/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCTinh.remoteMethod(
        'restoreTinh', {
            http: {path: '/:id/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCTinh.remoteMethod(
        'readTinh', {
            http: {path: '/:id/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCTinh.remoteMethod(
        'listTinh', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: [{arg: 'data', type: 'object'}],
        },
    )

    QCTinh.remoteMethod(
        'listDeletedTinh', {
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