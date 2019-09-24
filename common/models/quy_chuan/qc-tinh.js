module.exports = function(QCTinh) {
    const Promise = require('bluebird')

    QCTinh.createTinh = async function(uid, ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk){
        const tinhData = {
            uid: uid,
            ma: ma,
            ten: ten,
            ghiChu: ghiChu,
            sysCapDonViHanhChinhId: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QCTinh.create(tinhData)
            return data
        } catch (err) {
            console.log('createQCTinh', err)
            throw err
        }
    }

    QCTinh.updateTinh = async function(id, ma, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        try {
            const tinh = await QCTinh.findById(id)
            if (tinh.xoa == 1){
                return null
            }
            const tinhData = {
                id: id,
                ma: ma,
                ten: ten,
                ghiChu: ghiChu,
                sysCapDonViHanhChinhId: cap,
                loaiDonViHanhChinh: loai,
                nongThon: nt,
                bienGioi: bg,
                haiDao: hd,
                vungDBKhoKhan: dbkk,
                hieuLuc: hieuLuc
            }
            try {
                const data = await QCTinh.upsertWithWhere({id: tinhData.id}, tinhData)
                return data
            } catch (err) {
                console.log('updateQCTinh', err)
                throw err
            }
        } catch (err) {
            console.log('findTinh', err)
            throw err
        }
    }

    QCTinh.deleteTinh = async function(id){
        try {
            const data = await QCTinh.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQCTinh', err)
            throw err
        }
    }
    
    QCTinh.restoreTinh = async function(id){
        try {
            const data = await QCTinh.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQCTinh', err)
            throw err
        }
    }

    QCTinh.readTinh = async function(id){
        try {
            const data = await QCTinh.findById(id, {where: {xoa: false}})
            return data
        } catch (err) {
            console.log('readQCTinh', err)
            throw err
        }
    }

    QCTinh.listTinh = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
              QCTinh.find({
                where: {xoa: 0},
                fields: {ma: true, ten: true, ghiChu: true, sysCapDonViHanhChinhId: true, hieuLuc: true},
                include: ['SysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCTinh.count({xoa: false})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQCTinh', err)
            throw err
        }
    }

    QCTinh.listDeletedTinh = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
              QCTinh.find({
                where: {xoa: 1},
                fields: {ma: true, ten: true, ghiChu: true, sysCapDonViHanhChinhId: true, hieuLuc: true},
                include: ['SysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCTinh.count({xoa: true})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQCTinh', err)
            throw err
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
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'updateTinh', {
            http: {path: '/update', verb: 'post'},
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
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'deleteTinh', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'restoreTinh', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCTinh.remoteMethod(
        'readTinh', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
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
            returns: {arg: 'data', type: 'object'},
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
            returns: {arg: 'data', type: 'object'},
        },
    )
}