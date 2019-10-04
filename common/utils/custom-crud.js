"use strict";

const Promise = require('bluebird')
let queryObject = require("../../utils/query-object")

CustomCRUD = {}

CustomCRUD.create = async function (model, queryData) {
  let relations = model.definition.settings.relations
  Object.keys(relations).forEach(item => {
    let rfModel = app.models[relations[item].model]
    let fk = relations[item].foreignKey

    if (queryData[fk] != undefined) {
      let rfRecord = rfModel.findOne({where: {id: queryData[fk]}})
      if (!rfRecord) {
        let err = new Error()
        throw err
      }
    }
  })
  try {
    const data = await model.create(queryData)
    return data
  } catch (err) {
    console.log(`Error when create ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.list = async function (model, queryData, page, pageSize) {
  try {
    queryData.xoa = 0
    const [data, total] = await Promise.all([
      BieuNhapLieu_ChiTieu.find({
        where: { queryData },
        include: ['belongsToBieuNhapLieu', 'belongsToChiTieu']
      }),
      BieuNhapLieu_ChiTieu.count({
        xoa: 0
      })
    ])

    return {
      rows: queryObject.listAPIReturnsList(BieuNhapLieu_ChiTieu, data),
      page: page,
      pageSize: pageSize,
      total: total
    }
  } catch (err) {
    console.log('list Bieu-Nhap-Lieu-Chi-Tieu', err)
    throw err
  }
}

CustomCRUD.listDeleted = async function (model, queryData) {

}

CustomCRUD.read = async function (model, queryData) {

}

CustomCRUD.update = async function (model, queryData) {

}

CustomCRUD.delete = async function (model, queryData) {

}

CustomCRUD.restore = async function (model, queryData) {

}


module.exports = CustomCRUD