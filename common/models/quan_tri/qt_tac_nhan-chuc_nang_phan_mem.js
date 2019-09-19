let to = require('await-to-js').to;

'use_strict';

module.exports = function(QTTacNhanChucNangPhanMem) {
	//create Quan Tri Tac Nhan Chuc Nang Phan Mem
	QTTacNhanChucNangPhanMem.createQTTacNhanChucNangPhanMem = async function(id, qtChucNangPhanMem, 
																				qtTacNhanId, hieuLuc, xoa) {
        let [err, qtTacNhanChucNangPhanMem] = await to(QTTacNhanChucNangPhanMem.findOne({where: {id: id}}));
        if (qtTacNhanChucNangPhanMem != null) {
            return [200, 'QTTacNhanChucNangPhanMem existed']
        }
        let qtTacNhanChucNangPhanMemData = {
            id: id,
            qtChucNangPhanMem: qtChucNangPhanMem,
            qtTacNhanId: qtTacNhanId,
            hieuLuc: hieuLuc,
            xoa: xoa
        }
        QTTacNhanChucNangPhanMem.upsert(qtTacNhanChucNangPhanMemData)
        return [200, 'success']
    }

    //read Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhanChucNangPhanMem.readQTTacNhanChucNangPhanMem = async function(id) {
    	let [err, qtTacNhanChucNangPhanMem] = await to(QTTacNhanChucNangPhanMem.findOne({where: {id: id}}));
        if (qtTacNhanChucNangPhanMem == null) {
            return ["can't find qtTacNhanChucNangPhanMem", {}]
        }
        return ["success", qtTacNhanChucNangPhanMem];
    }

    //update Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhanChucNangPhanMem.updateQTTacNhanChucNangPhanMem = async function(id, qtChucNangPhanMem, 
    																			qtTacNhanId, hieuLuc, xoa) {
    	let [err, qtTacNhanChucNangPhanMem] = await to(QTTacNhanChucNangPhanMem.findOne({where: {id: id}}));
        if (qtTacNhanChucNangPhanMem == null) {
            return ['200', 'can not find QTTacNhanChucNangPhanMem']
        }
        let qtTacNhanChucNangPhanMemData = {
            id: id,
            qtChucNangPhanMem: qtChucNangPhanMem,
            qtTacNhanId: qtTacNhanId,
            hieuLuc: hieuLuc,
        }
        QTTacNhanChucNangPhanMem.upsert(qtTacNhanChucNangPhanMemData)
        return [200, 'success!']
    }

    //delete Quan Tri Tac Nhan Chuc Nang Phan Mem --- change xoa 0 -> 1 
    QTTacNhanChucNangPhanMem.deleteQTTacNhanChucNangPhanMem = async function(id) {
    	let [err, qtTacNhanChucNangPhanMem] = await to(QTTacNhanChucNangPhanMem.findOne({where: {id: id}}));
    	if (qtTacNhanChucNangPhanMem == null) {
            return ["can't find QTTacNhanChucNangPhanMem", {}]
        }
        if (qtTacNhanChucNangPhanMem.xoa === 0 ) {

        	qtTacNhanChucNangPhanMem.xoa = 1;
        	let qtTacNhanChucNangPhanMemData = {
        	id:id,
        	xoa: qtTacNhanChucNangPhanMem.xoa
        	}
	        QTTacNhanChucNangPhanMem.upsert(qtTacNhanChucNangPhanMemData)
	        return [200, 'success']
        } else {
        	return ["can't not delete qtTacNhanChucNangPhanMem", {}]
        }
    }

    //restore Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhanChucNangPhanMem.restoreQTTacNhanChucNangPhanMem = async function(id) {
        let [err, qtTacNhanChucNangPhanMem] = await to(QTTacNhanChucNangPhanMem.findOne({where: {id: id}}));
        if (qtTacNhanChucNangPhanMem == null) {
            return ["can't find qtTacNhanChucNangPhanMem", {}]
        }
        if (qtTacNhanChucNangPhanMem.xoa === 1) {
            let qtTacNhanChucNangPhanMemData = {
                id: id,
                xoa: 0
            }
            QTTacNhanChucNangPhanMem.upsert(qtTacNhanChucNangPhanMemData)
            return [200, "success"]
        }else {
            return ["can't not restore qtTacNhanChucNangPhanMemData "]
        }
    }


    QTTacNhanChucNangPhanMem.remoteMethod(
    	'createQTTacNhanChucNangPhanMem', {
            http: {path: '/qtTacNhanChucNangPhanMem', verb: 'post'},
            accepts: [
                // {arg: 'id', type: 'number', required: true},
               	{arg: 'qtChucNangPhanMem', type: 'number', required: false},
               	{arg: 'qtTacNhanId', type: 'number', required: false},
                {arg: 'hieuLuc', type: 'number', required: false},
                {arg: 'xoa', type: 'number', required: false}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
       	},
    )

    QTTacNhanChucNangPhanMem.remoteMethod(
        'readQTTacNhanChucNangPhanMem', {
            http: {path: '/qtTacNhanChucNangPhanMem', verb: 'get'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'messeage', type: 'string'},
                {arg: 'qtTacNhanChucNangPhanMem', type: 'object'}],
        },
    )

    QTTacNhanChucNangPhanMem.remoteMethod(
        'updateQTTacNhanChucNangPhanMem', {
            http: {path: '/qtTacNhanChucNangPhanMem', verb: 'put'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
               	{arg: 'qtChucNangPhanMem', type: 'number', required: false},
               	{arg: 'qtTacNhanId', type: 'number', required: false},
                {arg: 'hieuLuc', type: 'number', required: false},
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QTTacNhanChucNangPhanMem.remoteMethod(
        'deleteQTTacNhanChucNangPhanMem', {
            http: {path: '/qtTacNhanChucNangPhanMem', verb: 'delete'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    QTTacNhanChucNangPhanMem.remoteMethod(
        'restoreQTTacNhanChucNangPhanMem', {
            http: {path: '/qtTacNhanChucNangPhanMem/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        }
    )

};