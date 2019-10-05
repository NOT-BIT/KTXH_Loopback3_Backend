let app = require("../../../server/server")
let jwt = require("../../utils/jwt")

module.exports = function(CustomUser) {
    CustomUser.login = async function (username, password) {
        model = await app.models.QTUsers
        user = await model.findOne({where: {ten: username, matKhau: password}})
        if (!user) {
            return null
        } else {
            return {'token': await jwt.generateToken({
                id: user.id,
                email: user.email
            })}
        }
    }

    CustomUser.remoteMethod(
        'login',
        {
            http: {path: '/login', verb: 'post'},
            accepts: [
                {arg: 'username', type: 'string', required: 'true'},
                {arg: 'password', type: 'string', required: 'true'}
            ],
            returns: {arg: 'authorization', type: 'object'}
        }
    )
}