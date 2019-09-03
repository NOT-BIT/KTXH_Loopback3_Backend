let to = require('await-to-js').to;

'use strict';

module.exports = function (ChiTieu) {
    /**
       * Method Implementation
       *  */
    ChiTieu.list = async function () {
        let [error, listChiTieu] = await to(ChiTieu.find());
        if (error) {
            console.log(error);
            return [constants.RESPONSE_CODE_ERROR, 'error finding entities'];
        }

        return [200, listChiTieu];
    }

    ChiTieu.paging = async function (limit, skip) {
        let [error, listChiTieu] = await to(ChiTieu.find(
            {
                limit,
                skip
            }
        ));
        if (error) {
            console.log(error);
            return [constants.RESPONSE_CODE_ERROR, 'error finding entities'];
        }

        return [200, listChiTieu];
    }

    ChiTieu.createChiTieu = async function (capNhapLieuId, capTongHopId, chiTieuNhomId,
        chiTieuPhanToId, congDonTuDuoiLen, congTheoMa, congThucCong, coPhanToKhong, donViTinh,
        idCha, maChiTieu, mauSo, soThuTu, tenChiTieu, tinhPhanTram, tuSo) {
        let chiTieuData = {
            capNhapLieuId,
            capTongHopId,
            chiTieuNhomId,
            chiTieuPhanToId,
            congDonTuDuoiLen,
            congTheoMa,
            congThucCong,
            coPhanToKhong,
            donViTinh,
            idCha,
            maChiTieu,
            mauSo,
            soThuTu,
            tenChiTieu,
            tinhPhanTram,
            tuSo,
            hieuLuc: 1,
            xoa: 0
        }
        ChiTieu.upsert(chiTieuData)
        return [200, 'success']
    }

    ChiTieu.readChiTieu = async function (id) {
        let [err, chiTieu] = await to(ChiTieu.findOne({ where: { id: id } }));
        if (chiTieu == null) {
            return ["can't find entities", {}]
        }
        return ["success", chiTieu];
    }

    ChiTieu.updateChiTieu = async function (id, capNhapLieuId, capTongHopId, chiTieuNhomId,
        chiTieuPhanToId, congDonTuDuoiLen, congTheoMa, congThucCong, coPhanToKhong, donViTinh,
        idCha, maChiTieu, mauSo, soThuTu, tenChiTieu, tinhPhanTram, tuSo, hieuLuc, xoa) {
        let [err, chiTieu] = await to(ChiTieu.findOne({ where: { id: id } }))
        if (chiTieu == null) {
            return ['200', 'can not find entities']
        }
        let chiTieuData = {
            id: chiTieu.id,
            capNhapLieuId,
            capTongHopId,
            chiTieuNhomId,
            chiTieuPhanToId,
            congDonTuDuoiLen,
            congTheoMa,
            congThucCong,
            coPhanToKhong,
            donViTinh,
            idCha,
            maChiTieu,
            mauSo,
            soThuTu,
            tenChiTieu,
            tinhPhanTram,
            tuSo,
            hieuLuc,
            xoa
        }
        ChiTieu.upsert(chiTieuData)
        return [200, 'success']
    }

    ChiTieu.deleteChiTieu = async function (id) {
        let [err, chiTieu] = await to(ChiTieu.findOne({ where: { id: id } }))
        if (chiTieu == null) {
            return [200, 'can not find entities']
        }
        let chiTieuData = {
            id: chiTieu.id,
            capNhapLieuId: chiTieu.capNhapLieuId,
            capTongHopId: chiTieu.capTongHopId,
            chiTieuNhomId: chiTieu.chiTieuNhomId,
            chiTieuPhanToId: chiTieu.chiTieuPhanToId,
            congDonTuDuoiLen: chiTieu.congDonTuDuoiLen,
            congTheoMa: chiTieu.congTheoMa,
            congThucCong: chiTieu.congThucCong,
            coPhanToKhong: chiTieu.coPhanToKhong,
            donViTinh: chiTieu.donViTinh,
            idCha: chiTieu.idCha,
            maChiTieu: chiTieu.maChiTieu,
            mauSo: chiTieu.mauSo,
            soThuTu: chiTieu.soThuTu,
            tenChiTieu: chiTieu.tenChiTieu,
            tinhPhanTram: chiTieu.tinhPhanTram,
            tuSo: chiTieu.tuSo,
            hieuLuc: chiTieu.hieuLuc,
            xoa: 1
        }
        ChiTieu.upsert(chiTieuData)
        return [200, 'success']
    }


    /**
     * Method declaration
     *  */

    /**
    * @summary List all the books
    */
    ChiTieu.remoteMethod(
        'list', {
            http: { path: '/list', verb: 'get' },
            accepts: [],
            returns: [{ arg: 'status', type: 'number' }, { arg: 'data', type: 'string' }],
        },
    );

    /**
    * @summary List all the books
    * @param limit the size of the page
    * @param skip the number of entities to be skipped
    */
    ChiTieu.remoteMethod(
        'paging', {
            http: { path: '/paging', verb: 'get' },
            accepts: [
                {
                    arg: 'limit', type: 'number', required: true,
                    http: {
                        source: 'query'
                    }
                },
                {
                    arg: 'skip', type: 'number', required: true,
                    http: {
                        source: 'query'
                    }
                },
            ],
            returns: [{ arg: 'status', type: 'number' }, { arg: 'data', type: 'string' }],
        },
    );
    /**
     * @summary create chiTieu
     * @param capNhapLieuId
     * @param capTongHopId
     * @param chiTieuNhomId
     * @param chiTieuPhanToId
     * @param congDonTuDuoiLen
     * @param congTheoMa
     * @param congThucCong
     * @param coPhanToKhong
     * @param donViTinh
     * @param idCha
     * @param maChiTieu
     * @param mauSo
     * @param soThuTu
     * @param tenChiTieu
     * @param tinhPhanTram
     * @param tuSo
     * @returns 
     */
    ChiTieu.remoteMethod(
        'createChiTieu', {
            http: { path: '/', verb: 'post' },
            accepts: [
                { arg: 'capNhapLieuId', type: 'Number', required: false },
                { arg: 'capTongHopId', type: 'Number', required: false },
                { arg: 'chiTieuNhomId', type: 'Number', required: false },
                { arg: 'chiTieuPhanToId', type: 'Number', required: false },
                { arg: 'congDonTuDuoiLen', type: 'Number', required: false },
                { arg: 'congTheoMa', type: 'Number', required: false },
                { arg: 'congThucCong', type: 'String', required: false },
                { arg: 'coPhanToKhong', type: 'Number', required: false },
                { arg: 'donViTinh', type: 'String', required: false },
                { arg: 'idCha', type: 'Number', required: false },
                { arg: 'maChiTieu', type: 'String', required: false },
                { arg: 'mauSo', type: 'String', required: false },
                { arg: 'soThuTu', type: 'Number', required: false },
                { arg: 'tenChiTieu', type: 'String', required: false },
                { arg: 'tinhPhanTram', type: 'Number', required: false },
                { arg: 'tuSo', type: 'String', required: false }
            ],
            returns: [
                { arg: 'status', type: 'number' },
                { arg: 'message', type: 'string' }],
        },
    )

    /**
     * @summary find chiTieu by id
     * @param id chiTieu id
     * @returns 
     */
    ChiTieu.remoteMethod(
        'readChiTieu', {
            http: { path: '/:id', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', required: true }
            ],
            returns: [
                { arg: 'messeage', type: 'string' },
                { arg: 'chiTieu', type: 'object' }],
        },
    )

    /**
     * @summary create chiTieu
     * @param id
     * @param capNhapLieuId
     * @param capTongHopId
     * @param chiTieuNhomId
     * @param chiTieuPhanToId
     * @param congDonTuDuoiLen
     * @param congTheoMa
     * @param congThucCong
     * @param coPhanToKhong
     * @param donViTinh
     * @param idCha
     * @param maChiTieu
     * @param mauSo
     * @param soThuTu
     * @param tenChiTieu
     * @param tinhPhanTram
     * @param tuSo
     * @param hieuLuc
     * @param xoa
     * @returns 
     */
    ChiTieu.remoteMethod(
        'updateChiTieu', {
            http: { path: '/', verb: 'put' },
            accepts: [
                { arg: 'id', type: 'Number', required: true },
                { arg: 'capNhapLieuId', type: 'Number', required: false },
                { arg: 'capTongHopId', type: 'Number', required: false },
                { arg: 'chiTieuNhomId', type: 'Number', required: false },
                { arg: 'chiTieuPhanToId', type: 'Number', required: false },
                { arg: 'congDonTuDuoiLen', type: 'Number', required: false },
                { arg: 'congTheoMa', type: 'Number', required: false },
                { arg: 'congThucCong', type: 'String', required: false },
                { arg: 'coPhanToKhong', type: 'Number', required: false },
                { arg: 'donViTinh', type: 'String', required: false },
                { arg: 'idCha', type: 'Number', required: false },
                { arg: 'maChiTieu', type: 'String', required: false },
                { arg: 'mauSo', type: 'String', required: false },
                { arg: 'soThuTu', type: 'Number', required: false },
                { arg: 'tenChiTieu', type: 'String', required: false },
                { arg: 'tinhPhanTram', type: 'Number', required: false },
                { arg: 'tuSo', type: 'String', required: false },
                { arg: 'hieuLuc', type: 'Number', required: false },
                { arg: 'xoa', type: 'Number', required: false }
            ],
            returns: [
                { arg: 'status', type: 'number' },
                { arg: 'message', type: 'string' }],
        },
    )

    /**
     * @summary delete chiTieu by id
     * @param id chiTieu id
     * @returns 
     */
    ChiTieu.remoteMethod(
        'deleteChiTieu', {
            http: { path: '/:id', verb: 'delete' },
            accepts: [
                { arg: 'id', type: 'number', required: true }
            ],
            returns: [
                { arg: 'status', type: 'number' },
                { arg: 'message', type: 'string' }],
        },
    )
};
