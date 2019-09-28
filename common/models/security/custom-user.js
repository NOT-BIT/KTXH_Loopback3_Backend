let app = require("../../../server/server")

module.exports = function(CustomUser) {
    CustomUser.login = async function (username, password) {
        model = await app.models.QTUsers
        user = await model.findOne({where: {ten: username, matKhau: password}})
        if (!user) {
            return null
        } else {
            return {'token': 'hihi'}
        }
    }

    CustomUser.remoteMethod(
        'login',
        {
            http: {path: '/login', verb: 'post'},
            accepts: [
                {arg: 'username', type: 'string', required: 'true'},
                {arg: 'password', type: 'password', required: 'true'}
            ],
            returns: {arg: 'authorization', type: 'object'}
        }
    )
}