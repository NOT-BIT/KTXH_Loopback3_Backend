let to = require('await-to-js').to;

'use_strict';

module.exports = function(BieuNhapLieuChiTieu) {
	//create Bieu Nhap Lieu Chi Tieu
	BieuNhapLieuChiTieu.createBieuNhapLieuChiTieu = async function(id, bieuNhapLieuId, 
                                                                    chiTieuId, hieuLuc, xoa) {
        let [err, bnlChiTieu] = await to(BieuNhapLieuChiTieu.findOne({where: {id: id}}));
        if (bnlChiTieu != null) {
            return [200, 'bnlChiTieu existed']
        }
        let bnlChiTieuData = {
            id: id,
            bieuNhapLieuId: bieuNhapLieuId,
            chiTieuId: chiTieuId,
            hieuLuc: hieuLuc,
            xoa: xoa
        }
        BieuNhapLieuChiTieu.upsert(bnlChiTieuData)
        return [200, 'success']
    }

    //read Bieu Nhap Lieu Chi Tieu
    BieuNhapLieuChiTieu.readBieuNhapLieuChiTieu = async function(id) {
    	let [err, bnlChiTieu] = await to(QTDonVi.findOne({where: {id: id}}));
        if (bnlChiTieu == null) {
            return ["can't find bnlChiTieu", {}]
        }
        return ["success", bnlChiTieu];
    }

    //update Bieu Nhap Lieu Chi Tieu
    BieuNhapLieuChiTieu.updateBieuNhapLieuChiTieu = async function(id, bieuNhapLieuId, 
                                                                    chiTieuId, hieuLuc, xoa) {
    	let [err, bnlChiTieu] = await to(BieuNhapLieuChiTieu.findOne({where: {id: id}}));
        if (bnlChiTieu == null) {
            return ['200', 'can not find bnlChiTieu']
        }
        let bnlChiTieuData = {
            id: id,
            idCha: idCha,
            ma: ma,
            noiDung: noiDung,
            diaChi: diaChi,
            soDienThoai: soDienThoai,
            email: email,
            laDonVi: laDonVi,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc
        }
        BieuNhapLieuChiTieu.upsert(bnlChiTieuData)
        return [200, 'success!']
    }

    //delete Bieu Nhap Lieu Chi Tieu 
    BieuNhapLieuChiTieu.deleteBieuNhapLieuChiTieu = async function(id) {
    	let [err, bnlChiTieu] = await to(BieuNhapLieuChiTieu.findOne({where: {id: id}}));
    	if (bnlChiTieu == null) {
            return ["can't find bnlChiTieu", {}]
        }
        if (bnlChiTieu.xoa === 0 ) {
        	let bnlChiTieuData = {
	        	id: id,
	        	xoa: 1
        	}
	        BieuNhapLieuChiTieu.upsert(bnlChiTieuData)
	        return [200, 'success']
        } else{
        	return ["can't not delete bnlChiTieu", {}]
        }
    }

    // Restore Bieu Nhap Lieu Chi Tieu
    BieuNhapLieuChiTieu.restoreBieuNhapLieuChiTieu = async function(id) {
    	let [err, bnlChiTieu] = await to(BieuNhapLieuChiTieu.findOne({where: {id: id}}));
    	if (bnlChiTieu == null) {
    		return ["can't find bnlChiTieu", {}]
    	}
    	if (bnlChiTieu.xoa === 1) {
    		let bnlChiTieuData = {
    			id: id,
    			xoa: 0
    		}
            BieuNhapLieuChiTieu.upsert(bnlChiTieuData)
            return [200, 'success']
        }else{
            return ["can't not restore bnlChiTieu", {}]
        }
    	
    }

    BieuNhapLieuChiTieu.remoteMethod(
    	'createBieuNhapLieuChiTieu', {
            http: {path: '/bieuNhapLieuChiTieu', verb: 'post'},
            accepts: [
                {arg: 'bieuNhapLieuId', type: 'number', required: false},
                {arg: 'chiTieuId', type: 'number', required: false},
                {arg: 'hieuLuc', type: 'number', required: false},
                {arg: 'xoa', type: 'number', required: false}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
       	},
    )

    BieuNhapLieuChiTieu.remoteMethod(
        'readBieuNhapLieuChiTieu', {
            http: {path: '/bieuNhapLieuChiTieu', verb: 'get'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'messeage', type: 'string'},
                {arg: 'bnlChiTieu', type: 'object'}],
        },
    )


    BieuNhapLieuChiTieu.remoteMethod(
        'updateBieuNhapLieuChiTieu', {
            http: {path: '/bieuNhapLieuChiTieu', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'bieuNhapLieuId', type: 'number', required: false},
                {arg: 'chiTieuId', type: 'number', required: false},,
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    BieuNhapLieuChiTieu.remoteMethod(
        'deleteBieuNhapLieuChiTieu', {
            http: {path: '/bieuNhapLieuChiTieu', verb: 'delete'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    BieuNhapLieuChiTieu.remoteMethod(
        'restoreBieuNhapLieuChiTieu', {
            http: {path: '/bieuNhapLieuChiTieu/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

};