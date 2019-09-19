let to = require('await-to-js').to;

'use_strict';

module.exports = function(QTDonVi) {
	//create Quan Tri Don Vi
	QTDonVi.createQTDonVi = async function(id, idCha, ma, noiDung, diaChi, 
											soDienThoai, email, laDonVi, ghiChu, hieuLuc, xoa) {
        let [err, qtdonvi] = await to(QTDonVi.findOne({where: {id: id}}));
        if (qtdonvi != null) {
            return [200, 'qtdonvi existed']
        }
        let qtDonViData = {
            id: id,
            idCha: idCha,
            ma: ma,
            noiDung: noiDung,
            diaChi: diaChi,
            soDienThoai: soDienThoai,
            email: email,
            laDonVi: laDonVi,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc,
            xoa: xoa
        }
        QTDonVi.upsert(qtDonViData)
        return [200, 'success']
    }

    //read Quan Tri Don Vi
    QTDonVi.readQTDonVi = async function(id) {
    	let [err, qtDonVi] = await to(QTDonVi.findOne({where: {id: id}}));
        if (qtDonVi == null) {
            return ["can't find qtDonVi", {}]
        }
        return ["success", qtDonVi];
    }

    //update Quan Tri Don Vi
    QTDonVi.updateQTDonVi = async function(id, idCha, ma, noiDung, diaChi, 
    										soDienThoai, email, laDonVi, ghiChu, hieuLuc, xoa) {
    	let [err, qtDonVi] = await to(QTDonVi.findOne({where: {id: id}}));
        if (qtDonVi == null) {
            return ['200', 'can not find qtDonVi']
        }
        let qtDonViData = {
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
        QTDonVi.upsert(qtDonViData)
        return [200, 'success!']
    }

    //delete Quan Tri Don Vi --- change xoa 0 -> 1 
    QTDonVi.deleteQTDonVi = async function(id) {
    	let [err, qtDonVi] = await to(QTDonVi.findOne({where: {id: id}}));
    	if (qtDonVi == null) {
            return ["can't find qtDonVi", {}]
        }
        if (qtDonVi.xoa === 0 ) {
        	let qtDonViData = {
	        	id: id,
	        	xoa: 1
        	}
	        QTDonVi.upsert(qtDonViData)
	        return [200, 'success']
        } else{
        	return ["can't not delete qtDonVi", {}]
        }
    }

    // Restore Quan Tri Don Vi xoa: 1 -> 0
    QTDonVi.restoreQTDonVi = async function(id) {
    	let [err, qtDonVi] = await to(QTDonVi.findOne({where: {id: id}}));
    	if (qtDonVi == null) {
    		return ["can't find qtDonVi", {}]
    	}
    	if (qtDonVi.xoa === 1) {
    		let qtDonViData = {
    			id: id,
    			xoa: 0
    		}
            QTDonVi.upsert(qtDonViData)
            return [200, 'success']
        }else{
            return ["can't not restore qtDonVi", {}]
        }
    	
    }

    QTDonVi.remoteMethod(
    	'createQTDonVi', {
            http: {path: '/qtDonVi', verb: 'post'},
            accepts: [
                {arg: 'idCha', type: 'number', required: false},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'noiDung', type: 'string', required: false},
                {arg: 'diaChi', type: 'string', required: false},
                {arg: 'soDienThoai', type: 'string', required: false},
                {arg: 'email', type: 'string', required: false},
                {arg: 'laDonVi', type: 'number', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false},
                {arg: 'xoa', type: 'number', required: false}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
       	},
    )

    QTDonVi.remoteMethod(
        'readQTDonVi', {
            http: {path: '/qtDonVi', verb: 'get'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'messeage', type: 'string'},
                {arg: 'qtDonVi', type: 'object'}],
        },
    )


    QTDonVi.remoteMethod(
        'updateQTDonVi', {
            http: {path: '/qtDonVi', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'idCha', type: 'number', required: false},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'noiDung', type: 'string', required: false},
                {arg: 'diaChi', type: 'string', required: false},
                {arg: 'soDienThoai', type: 'string', required: false},
                {arg: 'email', type: 'string', required: false},
                {arg: 'laDonVi', type: 'number', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QTDonVi.remoteMethod(
        'deleteQTDonVi', {
            http: {path: '/qtDonVi', verb: 'delete'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QTDonVi.remoteMethod(
        'restoreQTDonVi', {
            http: {path: '/qtDonVi/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

};