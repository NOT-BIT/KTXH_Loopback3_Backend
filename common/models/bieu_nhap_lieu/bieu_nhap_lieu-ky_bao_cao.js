let to = require('await-to-js').to;

'use strict';

module.exports = function (BieuNhapLieuKyBaoCao) {
    /**
       * Method Implementation
       *  */
    BieuNhapLieuKyBaoCao.list = async function () {
        let [error, listBieuNhapLieuKyBaoCao] = await to(BieuNhapLieuKyBaoCao.find());
        if (error) {
            console.log(error);
            return [constants.RESPONSE_CODE_ERROR, 'error finding entities'];
        }

        return [200, listBieuNhapLieuKyBaoCao];
    }

    BieuNhapLieuKyBaoCao.paging = async function (limit, skip) {
        let [error, listBieuNhapLieuKyBaoCao] = await to(BieuNhapLieuKyBaoCao.find(
            {
                limit,
                skip
            }
        ));
        if (error) {
            console.log(error);
            return [constants.RESPONSE_CODE_ERROR, 'error finding entities'];
        }

        return [200, listBieuNhapLieuKyBaoCao];
    }

    BieuNhapLieuKyBaoCao.createBieuNhapLieuKyBaoCao = async function (bieuNhapLieuId, sysKyBaoCaoId) {
        let bieuNhapLieuKyBaoCaoData = {
            bieuNhapLieuId,
            sysKyBaoCaoId,
            hieuLuc: 1,
            xoa: 0
        }
        BieuNhapLieuKyBaoCao.upsert(bieuNhapLieuKyBaoCaoData)
        return [200, 'success']
    }

    BieuNhapLieuKyBaoCao.readBieuNhapLieuKyBaoCao = async function (id) {
        let [err, bieuNhapLieuKyBaoCao] = await to(BieuNhapLieuKyBaoCao.findOne({ where: { id: id } }));
        if (bieuNhapLieuKyBaoCao == null) {
            return ["can't find entities", {}]
        }
        return ["success", bieuNhapLieuKyBaoCao];
    }

    BieuNhapLieuKyBaoCao.updateBieuNhapLieuKyBaoCao = async function (id, bieuNhapLieuId, sysKyBaoCaoId, hieuLuc, xoa) {
        let [err, bieuNhapLieuKyBaoCao] = await to(BieuNhapLieuKyBaoCao.findOne({ where: { id: id } }))
        if (bieuNhapLieuKyBaoCao == null) {
            return ['200', 'can not find entities']
        }
        let bieuNhapLieuKyBaoCaoData = {
            id: bieuNhapLieuKyBaoCao.id,
            bieuNhapLieuId,
            sysKyBaoCaoId,
            hieuLuc,
            xoa
        }
        BieuNhapLieuKyBaoCao.upsert(bieuNhapLieuKyBaoCaoData)
        return [200, 'success']
    }

    BieuNhapLieuKyBaoCao.deleteBieuNhapLieuKyBaoCao = async function (id) {
        let [err, bieuNhapLieuKyBaoCao] = await to(BieuNhapLieuKyBaoCao.findOne({ where: { id: id } }))
        if (bieuNhapLieuKyBaoCao == null) {
            return [200, 'can not find entities']
        }
        let bieuNhapLieuKyBaoCaoData = {
            id: bieuNhapLieuKyBaoCao.id,
            bieuNhapLieuId: bieuNhapLieuKyBaoCao.bieuNhapLieuId,
            sysKyBaoCaoId: bieuNhapLieuKyBaoCao.sysKyBaoCaoId,
            hieuLuc: bieuNhapLieuKyBaoCao.hieuLuc,
            xoa: 1
        }
        BieuNhapLieuKyBaoCao.upsert(bieuNhapLieuKyBaoCaoData)
        return [200, 'success']
    }


    /**
     * Method declaration
     *  */

    /**
    * @summary List all the books
    */
    BieuNhapLieuKyBaoCao.remoteMethod(
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
    BieuNhapLieuKyBaoCao.remoteMethod(
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
     * @summary create bieuNhapLieuKyBaoCao
     * @param bieuNhapLieuId
     * @param sysKyBaoCaoId
     * @returns 
     */
    BieuNhapLieuKyBaoCao.remoteMethod(
        'createBieuNhapLieuKyBaoCao', {
            http: { path: '/', verb: 'post' },
            accepts: [
                { arg: 'bieuNhapLieuId', type: 'Number', required: false },
                { arg: 'sysKyBaoCaoId', type: 'Number', required: false }
            ],
            returns: [
                { arg: 'status', type: 'number' },
                { arg: 'message', type: 'string' }],
        },
    )

    /**
     * @summary find bieuNhapLieuKyBaoCao by id
     * @param id bieuNhapLieuKyBaoCao id
     * @returns 
     */
    BieuNhapLieuKyBaoCao.remoteMethod(
        'readBieuNhapLieuKyBaoCao', {
            http: { path: '/:id', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', required: true }
            ],
            returns: [
                { arg: 'messeage', type: 'string' },
                { arg: 'bieuNhapLieuKyBaoCao', type: 'object' }],
        },
    )

    /**
     * @summary create bieuNhapLieuKyBaoCao
     * @param id
     * @param bieuNhapLieuId
     * @param sysKyBaoCaoId
     * @param hieuLuc
     * @param xoa
     * @returns 
     */
    BieuNhapLieuKyBaoCao.remoteMethod(
        'updateBieuNhapLieuKyBaoCao', {
            http: { path: '/', verb: 'put' },
            accepts: [
                { arg: 'id', type: 'Number', required: true },
                { arg: 'bieuNhapLieuId', type: 'Number', required: false },
                { arg: 'sysKyBaoCaoId', type: 'Number', required: false },
                { arg: 'hieuLuc', type: 'Number', required: false },
                { arg: 'xoa', type: 'Number', required: false }
            ],
            returns: [
                { arg: 'status', type: 'number' },
                { arg: 'message', type: 'string' }],
        },
    )

    /**
     * @summary delete bieuNhapLieuKyBaoCao by id
     * @param id bieuNhapLieuKyBaoCao id
     * @returns 
     */
    BieuNhapLieuKyBaoCao.remoteMethod(
        'deleteBieuNhapLieuKyBaoCao', {
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
