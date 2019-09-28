let queryObject = require("../../utils/query-object")
let app = require("../../../server/server")

module.exports = function(Test) {
    Test.test = async function () {
        model = await app.models.QTUsers_TacNhan
        object = await model.findOne({where: {id: 1}})
        if (object) {
            nobject = await queryObject.listAPIReturns(model, object);
            console.log(nobject)
        } else {
            console.log("Can't find any object!")
        }
    }

    Test.remoteMethod(
        'test',
        {
            http: {path: '/test', verb: 'get'}
        }
    )
}