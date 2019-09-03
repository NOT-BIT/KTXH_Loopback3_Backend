let to = require('await-to-js').to;

'use strict';

module.exports = function (ChiTieuPhanTo) {
    /**
       * Method Implementation
       *  */
    ChiTieuPhanTo.list = async function () {
        let [error, listChiTieuPhanTo] = await to(ChiTieuPhanTo.find());
        if (error) {
            console.log(error);
            return [constants.RESPONSE_CODE_ERROR, 'error finding entities'];
        }

        return [200, listChiTieuPhanTo];
    }

    ChiTieuPhanTo.paging = async function (limit, skip) {
        let [error, listChiTieuPhanTo] = await to(ChiTieuPhanTo.find(
            {
                limit,
                skip
            }
        ));
        if (error) {
            console.log(error);
            return [constants.RESPONSE_CODE_ERROR, 'error finding entities'];
        }

        return [200, listChiTieuPhanTo];
    }

    ChiTieuPhanTo.createChiTieuPhanTo = async function (ma, tenPhanTo) {
        let chiTieuPhanToData = {
            ma,
            tenPhanTo,
            hieuLuc: 1,
            xoa: 0
        }
        ChiTieuPhanTo.upsert(chiTieuPhanToData)
        return [200, 'success']
    }

    ChiTieuPhanTo.readChiTieuPhanTo = async function (id) {
        let [err, chiTieuPhanTo] = await to(ChiTieuPhanTo.findOne({ where: { id: id } }));
        if (chiTieuPhanTo == null) {
            return ["can't find entities", {}]
        }
        return ["success", chiTieuPhanTo];
    }

    ChiTieuPhanTo.updateChiTieuPhanTo = async function (id, ma, tenPhanTo, hieuLuc, xoa) {
        let [err, chiTieuPhanTo] = await to(ChiTieuPhanTo.findOne({ where: { id: id } }))
        if (chiTieuPhanTo == null) {
            return ['200', 'can not find entities']
        }
        let chiTieuPhanToData = {
            id: chiTieuPhanTo.id,
            ma,
            tenPhanTo,
            hieuLuc,
            xoa
        }
        ChiTieuPhanTo.upsert(chiTieuPhanToData)
        return [200, 'success']
    }

    ChiTieuPhanTo.deleteChiTieuPhanTo = async function (id) {
        let [err, chiTieuPhanTo] = await to(ChiTieuPhanTo.findOne({ where: { id: id } }))
        if (chiTieuPhanTo == null) {
            return [200, 'can not find entities']
        }
        let chiTieuPhanToData = {
            id: chiTieuPhanTo.id,
            ma: chiTieuPhanTo.ma,
            tenPhanTo: chiTieuPhanTo.tenPhanTo,
            hieuLuc: chiTieuPhanTo.hieuLuc,
            xoa: 1
        }
        ChiTieuPhanTo.upsert(chiTieuPhanToData)
        return [200, 'success']
    }


    /**
     * Method declaration
     *  */

    /**
    * @summary List all the books
    */
    ChiTieuPhanTo.remoteMethod(
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
    ChiTieuPhanTo.remoteMethod(
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
     * @summary create chiTieuPhanTo
     * @param ma
     * @param tenPhanTo
     * @returns 
     */
    ChiTieuPhanTo.remoteMethod(
        'createChiTieuPhanTo', {
            http: { path: '/', verb: 'post' },
            accepts: [
                { arg: 'ma', type: 'String', required: false },
                { arg: 'tenPhanTo', type: 'String', required: false }
            ],
            returns: [
                { arg: 'status', type: 'number' },
                { arg: 'message', type: 'string' }],
        },
    )

    /**
     * @summary find chiTieuPhanTo by id
     * @param id chiTieuPhanTo id
     * @returns 
     */
    ChiTieuPhanTo.remoteMethod(
        'readChiTieuPhanTo', {
            http: { path: '/:id', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', required: true }
            ],
            returns: [
                { arg: 'messeage', type: 'string' },
                { arg: 'chiTieuPhanTo', type: 'object' }],
        },
    )

    /**
     * @summary create chiTieuPhanTo
     * @param id
     * @param ma
     * @param tenPhanTo
     * @param hieuLuc
     * @param xoa
     * @returns 
     */
    ChiTieuPhanTo.remoteMethod(
        'updateChiTieuPhanTo', {
            http: { path: '/', verb: 'put' },
            accepts: [
                { arg: 'id', type: 'Number', required: true },
                { arg: 'ma', type: 'String', required: false },
                { arg: 'tenPhanTo', type: 'String', required: false },
                { arg: 'hieuLuc', type: 'Number', required: false },
                { arg: 'xoa', type: 'Number', required: false }
            ],
            returns: [
                { arg: 'status', type: 'number' },
                { arg: 'message', type: 'string' }],
        },
    )

    /**
     * @summary delete chiTieuPhanTo by id
     * @param id chiTieuPhanTo id
     * @returns 
     */
    ChiTieuPhanTo.remoteMethod(
        'deleteChiTieuPhanTo', {
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
