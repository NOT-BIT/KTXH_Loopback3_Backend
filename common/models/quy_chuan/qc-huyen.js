module.exports = function(QCHuyen) {
    const Promise = require('bluebird')

    QCHuyen.createHuyen = async function(uid, ma, qcTinhId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk){
        const huyenData = {
            uid: uid,
            ma: ma,
            qcTinhId: qcTinhId,
            ten: ten,
            ghiChu: ghiChu,
            sysCapDonViHanhChinhId: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            hieuLuc: 1,
            xoa: 0
        }
        try {
            const data = await QCHuyen.create(huyenData)
            return data
        } catch (err) {
            console.log('createQCHuyen', err)
            throw err
        }
    }

    QCHuyen.updateHuyen = async function(id, ma, qcTinhId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
        try {
            const huyen = await QCHuyen.findById(id)
            if (huyen.xoa == 1){
                return null
            }
            const huyenData = {
                id: id,
                ma: ma,
                qcTinhId: qcTinhId,
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
                const data = await QCHuyen.upsertWithWhere({id: huyenData.id}, huyenData)
                return data
            } catch (err) {
                console.log('updateQCHuyen', err)
                throw err
            }
        } catch (err) {
            console.log('findHuyen', err)
            throw err
        }
    }

    QCHuyen.deleteHuyen = async function(id){
        try {
            const data = await QCHuyen.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQCHuyen', err)
            throw err
        }
    }
    
    QCHuyen.restoreHuyen = async function(id){
        try {
            const data = await QCHuyen.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQCHuyen', err)
            throw err
        }
    }

    QCHuyen.readHuyen = async function(id){
        try {
            const data = await QCHuyen.findById(id, {where: {xoa: false}})
            return data
        } catch (err) {
            console.log('readQCHuyen', err)
            throw err
        }
    }

    QCHuyen.listHuyen = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
                QCHuyen.find({
                where: {xoa: 0},
                fields: {ma: true, ten: true, ghiChu: true, qcTinhId: true, sysCapDonViHanhChinhId: true, hieuLuc: true},
                include: ['QCTinh', 'SysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCHuyen.count({xoa: false})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQCHuyen', err)
            throw err
        }
    }

    QCHuyen.listDeletedHuyen = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
              QCHuyen.find({
                where: {xoa: 1},
                fields: {ma: true, ten: true, ghiChu: true, qcTinhId: true, sysCapDonViHanhChinhId: true, hieuLuc: true},
                include: ['QCTinh', 'SysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCHuyen.count({xoa: true})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQCHuyen', err)
            throw err
        }
    }

    QCHuyen.remoteMethod(
        'createHuyen', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'qcTinhId', type: 'number', required: true},
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

    QCHuyen.remoteMethod(
        'updateHuyen', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'qcTinhId', type: 'number', required: false},
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

    QCHuyen.remoteMethod(
        'deleteHuyen', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCHuyen.remoteMethod(
        'restoreHuyen', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCHuyen.remoteMethod(
        'readHuyen', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCHuyen.remoteMethod(
        'listHuyen', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCHuyen.remoteMethod(
        'listDeletedHuyen', {
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