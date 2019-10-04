"use strict";

const Promise = require('bluebird')
let queryObject = require("./query-object")

CustomCRUD = {}

CustomCRUD.create = async function (model, queryData) {
  let relations = model.definition.settings.relations
  Object.keys(relations).forEach(item => {
    if (item.match(/^belongsTo/)) {
      let rfModel = app.models[relations[item].model]
      let fk = relations[item].foreignKey

      if (queryData[fk] != undefined) {
        let rfRecord = rfModel.findOne({ where: { id: queryData[fk], xoa: 0 } })
        if (!rfRecord) {
          console.log(`Create ${model.definition.name}: ${err}`)
          let err = new Error()
          throw err
        }
      }
    }
  })

  try {
    const data = await model.create(queryData)
    return data
  } catch (err) {
    console.log(`Create ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.list = async function (model, queryData, page, pageSize) {
  try {
    queryData.xoa = 0
    const [data, total] = await Promise.all([
      model.find({
        where: queryData,
        skip: page * pageSize,
        limit: pageSize
      }),
      BieuNhapLieu_ChiTieu.count({
        xoa: 0
      })
    ])

    listRelation = listRelationsFilter(model)
    data.forEach(record => {
      Object.keys(listRelation).forEach(relation => {
        let rfModel = app.models[relations[relation].model]
        let fk = relations[relation].foreignKey
        record[relation] = await rfModel.find({ where: { id: record[fk], xoa: 0 } })
      })
      record = listAPIReturns(model, record)
    })

    return {
      rows: data,
      page: page,
      pageSize: pageSize,
      total: total
    }
  } catch (err) {
    console.log(`List ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.listDeleted = async function (model, queryData) {
  try {
    queryData.xoa = 1
    const [data, total] = await Promise.all([
      model.find({
        where: queryData,
        skip: page * pageSize,
        limit: pageSize
      }),
      BieuNhapLieu_ChiTieu.count({
        xoa: 0
      })
    ])

    listRelation = listRelationsFilter(model)
    data.forEach(record => {
      Object.keys(listRelation).forEach(relation => {
        let rfModel = app.models[relations[relation].model]
        let fk = relations[relation].foreignKey
        record[relation] = await rfModel.find({ where: { id: record[fk], xoa: 0 } })
      })
      record = listAPIReturns(model, record)
    })

    return {
      rows: data,
      page: page,
      pageSize: pageSize,
      total: total
    }
  } catch (err) {
    console.log(`List ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.read = async function (model, id) {
  try {
    const record = await Promise.all([
      model.findOne({
        where: { id: id, xoa: 0 }
      })
    ])

    listRelation = listRelationsFilter(model)
    Object.keys(listRelation).forEach(relation => {
      let rfModel = app.models[relations[relation].model]
      let fk = relations[relation].foreignKey
      record[relation] = await rfModel.find({ where: { id: record[fk], xoa: 0 } })
    })
    record = listAPIReturns(model, record)
    return record
  } catch (err) {
    console.log(`Read ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.update = async function (model, queryData) {
  if (!queryData.id) {
    let err = new Error()
    throw err
  }

  let curRecord = await model.findOne({ where: { id: queryData.id } })
  if (!curRecord) {
    let err = new Error()
    throw err
  }

  let relations = model.definition.settings.relations
  Object.keys(relations).forEach(item => {
    let rfModel = app.models[relations[item].model]
    let fk = relations[item].foreignKey

    if (queryData[fk] != undefined) {
      let rfRecord = rfModel.findOne({ where: { id: queryData[fk], xoa: 0 } })
      if (!rfRecord) {
        let err = new Error()
        throw err
      }
    }
  })
  try {
    const data = await model.upsert(queryData)
    return data
  } catch (err) {
    console.log(`Update ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.delete = async function (model, id) {

  let curRecord = await model.findOne({ where: { id: id } })
  if (!curRecord) {
    let err = new Error()
    throw err
  }

  let relations = model.definition.settings.relations
  Object.keys(relations).forEach(item => {
    if (item.match(/^hasMany/)) {
      let rfModel = app.models[relations[item].model]
      let fk = relations[item].foreignKey
      let whereFilter = JSON.parse(`{"${fk}" : ${id}, "xoa": 0}`)
      let rfRecord = rfModel.findOne({ where: whereFilter })
      if (rfRecord) {
        let err = new Error()
        throw err
      }
    }
  })
  try {
    const queryData = {id: id,
    xoa: 1}
    const data = await model.upsert(queryData)
    return data
  } catch (err) {
    console.log(`Delete ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.restore = async function (model, queryData) {
  let curRecord = await model.findOne({ where: { id: id } })
  if (!curRecord) {
    let err = new Error()
    throw err
  }

  try {
    const queryData = {id: id,
    xoa: 0}
    const data = await model.upsert(queryData)
    return data
  } catch (err) {
    console.log(`Restore ${model.definition.name}: ${err}`)
    throw err
  }
}


module.exports = CustomCRUD