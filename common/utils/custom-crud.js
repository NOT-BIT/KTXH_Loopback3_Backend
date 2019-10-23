"use strict";

const Promise = require('bluebird')
let queryObject = require("./query-object")
let app = require("../../server/server")
let to = require("await-to-js")

var CustomCRUD = {}

CustomCRUD.create = async function (model, queryData) {
  let relations = model.definition.settings.relations || new Object()
  let relationsKey = Object.keys(relations)

  for (let i in relationsKey) {
    let item = relationsKey[i]
    if (item.match(/^belongsTo/)) {
      let rfModel = app.models[relations[item].model]
      let fk = relations[item].foreignKey

      // console.log(item, queryData[fk])
      if (queryData[fk] != undefined) {
        let rfRecord = await rfModel.findOne({ where: { id: queryData[fk], xoa: 0 } })
        if (!rfRecord) {
          let err = new Error("Can't find referenced record")
          console.log(`Create ${model.definition.name}: ${err}`)
          throw err
        }
      }
    }
  }

  try {
    const data = await model.create(queryData)
    var properties = model.definition.properties
    let record = {}
    record.id = data.id
    Object.keys(properties).forEach(item => {
      record[item] = data[item]
    });
    let listRelation = queryObject.listRelationsFilter(model)
    let relations = model.definition.settings.relations
    for (let j in listRelation) {
      console.log(j)
      let relation = listRelation[j]
      let rfModel = app.models[relations[relation].model]
      let fk = relations[relation].foreignKey
      let rfData = await rfModel.findOne({ where: { id: record[fk], xoa: 0 } })
      record[relation] = queryObject.listAPIReturns(rfModel, rfData, false)
    }
    return record
  } catch (err) {
    console.log(`Create ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.list = async function (model, queryData, page, pageSize) {
  if (!queryData) {
    queryData = {}
  }
  try {
    queryData.xoa = 0
    const [data, total] = await Promise.all([
      model.find({where: queryData, skip: page * pageSize, limit: pageSize}),
      model.count({xoa: 0})
    ])
    let listRelation = queryObject.listRelationsFilter(model)
    let relations = model.definition.settings.relations
    let returnData =  queryObject.listAPIReturnsList(model, data, false)
    for (let i in data) {
      let record = returnData[i] = JSON.parse(JSON.stringify(returnData[i]))
      for (let j in listRelation) {
        let relation = listRelation[j]
        let rfModel = app.models[relations[relation].model]
        let fk = relations[relation].foreignKey
        let rfData = await rfModel.findOne({ where: { id: data[i][fk], xoa: 0 } })
        record[relation] = queryObject.listAPIReturns(rfModel, rfData, false)
      }
    }
    return {
      rows: returnData,
      page: page,
      pageSize: pageSize,
      total: total
    }
  } catch (err) {
    console.log(`List ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.listDeleted = async function (model, queryData, page, pageSize) {
  if (!queryData) {
    queryData = {}
  }
  try {
    queryData.xoa = 1
    const [data, total] = await Promise.all([
      model.find({where: queryData, skip: page * pageSize, limit: pageSize}),
      model.count({xoa: 1})
    ])
    listRelation = queryObject.listRelationsFilter(model)
    relations = model.definition.settings.relations
    let returnData =  queryObject.listAPIReturnsList(model, data, false)
    for (let i in data) {
      let record = returnData[i] = JSON.parse(JSON.stringify(returnData[i]))
      for (let j in listRelation) {
        let relation = listRelation[j]
        let rfModel = app.models[relations[relation].model]
        let fk = relations[relation].foreignKey
        let rfData = await rfModel.findOne({ where: { id: data[i][fk]} })
        record[relation] = queryObject.listAPIReturns(rfModel, rfData, false)
      }
    }
    return {
      rows: returnData,
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
    var record = await Promise.all([
      model.findOne({
        where: { id: id, xoa: 0 }
      })
    ])
    let listRelation = queryObject.listRelationsFilter(model)
    let relations = model.definition.settings.relations
    record = JSON.parse(JSON.stringify(record))[0]
    for (let j in listRelation) {
      let relation = listRelation[j]
      let rfModel = app.models[relations[relation].model]
      let fk = relations[relation].foreignKey
      record[relation] = queryObject.listAPIReturnsList(
        rfModel,
        await rfModel.find({ where: { id: record[fk], xoa: 0 } }),
        false
      )
    }
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

  let relations = model.definition.settings.relations || new Object()
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

CustomCRUD.delete = async function (model, ids) {
  let datas = []
  for (let i in ids) {
    let id = ids[i]
    let curRecord = await model.findOne({ where: { id: id } })
    if (!curRecord) {
      let err = new Error(`Cannot find record has id ${id}`)
      throw err
    }
    let relations = model.definition.settings.relations
    let relationsKey = Object.keys(relations)
    for (let i in relationsKey) {
      let item = relationsKey[i]
      if (item.match(/^hasMany/)) {
        let rfModel = app.models[relations[item].model]
        let fk = relations[item].foreignKey
        let whereFilter = JSON.parse(`{"${fk}" : ${id}, "xoa": 0}`)
        let rfRecord =  await rfModel.findOne({ where: whereFilter })
        console.log(relations[item].model, rfRecord)
        if (rfRecord){
          let err2 = new Error()
          throw err2
        }
      }
    }
    try {
      const queryData = {id: id,
      xoa: 1}
      const data = await model.upsert(queryData)
      datas.push(data)
    } catch (err) {
      console.log(`Delete ${model.definition.name}: ${err}`)
      throw err
    }
  }
  return datas
}

CustomCRUD.restore = async function (model, ids) {
  let datas = []
  for (let i in ids) {
    let id = ids[i]
    let curRecord = await model.findOne({ where: { id: id } })
    if (!curRecord) {
      let err = new Error()
      throw err
    }

    try {
      const queryData = {id: id,
      xoa: 0}
      const data = await model.upsert(queryData)
      datas.push(data)
    } catch (err) {
      console.log(`Restore ${model.definition.name}: ${err}`)
      throw err
    }
  }
  return datas
}


module.exports = CustomCRUD