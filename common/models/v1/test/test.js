let queryObject = require("../../../utils/query-object")
let app = require("../../../../server/server")

module.exports = function(Test) {
    Test.test = async function () {
        // model = await app.models.QTUsers_TacNhan
        // relations = queryObject.listRelationsFilter(model)
        // object = await model.findOne({where: {id: 1}, include: queryObject.listRelationsFilter})
        // if (object) {
        //     nobject = queryObject.listAPIReturns(model, object);
        //     console.log(nobject)
        // } else {
        //     console.log("Can't find any object!")
        // }

        return queryObject.test();
    }

    Test.remoteMethod(
        'test',
        {
            http: {path: '/test', verb: 'post'},
            returns: {arg: "data"}
        }
    )
}