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
    if (relations[item].type.match(/^belongsTo/)) {
      let rfModel = app.models[relations[item].model]
      let fk = relations[item].foreignKey

      if (queryData[fk] != undefined) {
        let rfRecord = await rfModel.findOne({ where: { id: queryData[fk], xoa: 0 } })
        if (!rfRecord) {
          var err = {"Error": `Can't find referenced record. Refernced Model = ${relations[item].model}. Referenced Id = ${queryData[fk]}.`}
          console.log(`Create ${model.definition.name}: ${JSON.stringify(err)}`)
          throw err
        }
      }
    }
  }

  try {
    let oldRecord = await model.findOne({ where: { ma: queryData.ma} })
    if (oldRecord != null){
      if (oldRecord.xoa == 1){
        await model.destroyById(oldRecord.id)
      }
    }
    const data = await model.upsert(queryData)
    var properties = model.definition.properties
    let record = {}
    record.id = data.id
    Object.keys(properties).forEach(item => {
      record[item] = data[item]
    });
    let listRelation = queryObject.listRelationsFilter(model)
    let relations = model.definition.settings.relations
    for (let j in listRelation) {
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
  if (!queryData.getAllData || queryData.getAllData == false){
    if (!page) {
      page = 0
    }
    if (!pageSize) {
      pageSize = 20
    }
    queryData.skip = page * pageSize;
    queryData.limit = pageSize;
  } else{
    page = pageSize = undefined
  }

  try {
    if (!queryData.where) {
      queryData.where = {}
    }
    queryData.where.xoa = 0
    const [data, total] = await Promise.all([
      model.find(queryData),
      model.count(queryData.where)
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
  if (!queryData.getAllData || !queryData.getAllData == false){
    if (!page) {
      page = 0
    }
    if (!pageSize) {
      pageSize = 20
    }
    queryData.skip = page * pageSize;
    queryData.limit = pageSize;
  } else{
    page = pageSize = undefined
  }

  try {
    if (!queryData.where) {
      queryData.where = {}
    }
    queryData.where.xoa = 1
    const [data, total] = await Promise.all([
      model.find(queryData),
      model.count(queryData.where)
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
        let rfData = await rfModel.findOne({ where: { id: data[i][fk], xoa: 1 } })
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
    if (record[0] == null) {
      var err = {"Error": `Can't find record. Id = ${id}`}
      console.log(`Read ${model.definition.name}: ${JSON.stringify(err)}`)
      throw err
    }
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
    var err = {"Error": `Missing id.`}
    console.log(`Update ${model.definition.name}: ${JSON.stringify(err)}`)
    throw err
  }

  let curRecord = await model.findOne({ where: { id: queryData.id } })
  if (!curRecord) {
    var err = {"Error": `Can't find record.`}
    console.log(`Update ${model.definition.name}: ${JSON.stringify(err)}`)
    throw err
  }

  let relations = model.definition.settings.relations || new Object()
  let relationKey = Object.keys(relations)
  for (let i in relationKey) {
    let item = relationKey[i]
    let rfModel = app.models[relations[item].model]
    let fk = relations[item].foreignKey

    if (queryData[fk] != undefined) {
      let rfRecord = rfModel.findOne({ where: { id: queryData[fk], xoa: 0 } })
      if (!rfRecord) {
        var err = {"Error": `Can't find referenced record. Refernced Model = ${relations[item].model}. Referenced Id = ${queryData[fk]}.`}
        console.log(`Update ${model.definition.name}: ${JSON.stringify(err)}`)
        throw err
      }
    }
  }
  try {
    const data = await model.upsert(queryData)
    let listRelation = queryObject.listRelationsFilter(model)
    let record = JSON.parse(JSON.stringify(data))
    for (let j in listRelation) {
      let relation = listRelation[j]
      let rfModel = app.models[relations[relation].model]
      let fk = relations[relation].foreignKey
      let rfData = await rfModel.findOne({ where: { id: data[fk], xoa: 0 } })
        record[relation] = queryObject.listAPIReturns(rfModel, rfData, false)
    }
    return record
  } catch (err) {
    console.log(`Update ${model.definition.name}: ${err}`)
    throw err
  }
}

CustomCRUD.delete = async function (model, ids) {
  let datas = []
  for (let i in ids) {
    let id = ids[i]
    let curRecord = await model.findOne({ where: { id: id, xoa: 0 } })
    if (!curRecord) {
      var err = {"Error": `Can't find record. Id = ${id}`}
      console.log(`Delete ${model.definition.name}: ${JSON.stringify(err)}`)
      datas.push(err)
      continue
    }
    let relations = model.definition.settings.relations
    let relationsKey = Object.keys(relations)
    let referenced = false
    for (let i in relationsKey) {
      let item = relationsKey[i]
      if (relations[item].type.match(/^hasMany/)) {
        let rfModel = app.models[relations[item].model]
        let fk = relations[item].foreignKey
        let whereFilter = JSON.parse(`{"${fk}" : ${id}, "xoa": 0}`)
        let rfRecord =  await rfModel.findOne({ where: whereFilter })
        if (rfRecord){
          referenced = true
          break
        }
      }
    }
    if (referenced) {
      var err = {"Error": `Can't delete referenced record.`}
      console.log(`Delete ${model.definition.name}: ${JSON.stringify(err)}`)
      datas.push(err)
      continue
    }
    try {
      const queryData = {id: id, xoa: 1}
      const data = await model.upsert(queryData)
      datas.push(data)
    } catch (err) {
      console.log(`Delete ${model.definition.name}: ${err}`)
      datas.push(err)
      continue
    }
  }
  return datas
}

CustomCRUD.restore = async function (model, ids) {
  let datas = []
  for (let i in ids) {
    let id = ids[i]
    let curRecord = await model.findOne({ where: { id: id, xoa: 1 } })
    if (!curRecord) {
      var err = {"Error": `Can't find record. Id = ${id}`}
      console.log(`Restore ${model.definition.name}: ${JSON.stringify(err)}`)
      datas.push(err)
      continue
    }

    try {
      const queryData = {id: id,
      xoa: 0}
      const data = await model.upsert(queryData)
      datas.push(data)
    } catch (err) {
      console.log(`Restore ${model.definition.name}: ${err}`)
      datas.push(err)
      continue
    }
  }
  return datas
}

CustomCRUD.generateNodeIndexFromId = function (id, size = 10) {
  return String(String(id).padStart(size, '0'));
}

CustomCRUD.autoUpdateTraceAndLevel = async function(model, instance, idCha, parentInstance) {
  if (!parentInstance && instance[idCha]) {
    parentInstance = await model.findOne({where: {id: instance[idCha]}})
  }

  console.log(parentInstance)

  let parentTrace = this.generateNodeIndexFromId('')
  let parentLevel = 0
  if (parentInstance && instance.id != instance[idCha]) {
    parentTrace = String(parentInstance.trace)
    parentLevel = parentInstance.level
  }

  let instanceIndex = this.generateNodeIndexFromId(instance.id)

  if (!instance.trace || (String(instance.trace) !== parentTrace + instanceIndex)) {
    console.log(instance.id, "upserted!")
    instance.trace = parentTrace + instanceIndex
    instance.level = parentLevel + 1
    await model.upsert(instance)
    let childenInstances = await model.find({where: JSON.parse(`{"${idCha}": ${instance.id}}`)})
    for (let i in childenInstances) {
      this.autoUpdateTraceAndLevel(model, childenInstances[i], idCha, instance);
    }
  }
}

CustomCRUD.newUpdate = async function (model, queryData) {
  let relations = model.definition.settings.relations || new Object()
  let relationsKey = Object.keys(relations)
  const rfModel = []
  const fk = []
  for (let i in relationsKey) {
    let item = relationsKey[i]
    if (relations[item].type.match(/^belongsTo/)) {
      let rfModeli = app.models[relations[item].model]
      let fki = relations[item].foreignKey
      rfModel.push(rfModeli)
      fk.push(fki)
    }
  }
  let rf1Id, rf1Model
  for (let i = 0; i < fk.length; i++){
    if (queryData[fk[i]] != null){
      rf1Id = fk[i]
      rf1Model = rfModel[i]
      fk.splice(i,1)
      rfModel.splice(i,1)
      break
    }
  }
  try{
    await model.destroyAll({
      where: JSON.parse(`{"${rf1Id}": ${queryData[rf1Id]}}`)
    })
    let rfRecord0 = await rf1Model.findOne({ where: {id: queryData[rf1Id]}})
    let newList = []
    for (let i =0; i < queryData.listID.length; i++){
      let query = queryData.listID[i]
      var data = {}
      data.uid = rfRecord0.uid
      data.ma = rfRecord0.ma
      data.createdAt = new Date()
      data.createdBy = 0
      data[rf1Id] = queryData[rf1Id]
      for (let j = 0; j < fk.length; j++){
        let rfRecordi = await CustomCRUD.read(rfModel[j],query[fk[j]])
        data[fk[j]] = query[fk[j]]
        data.uid += rfRecordi.uid
        data.ma += rfRecordi.ma
        delete query[fk[j]]
      }
      data = Object.assign(query, data)
      let newRecord = await CustomCRUD.create(model, data)
      newList.push(newRecord)
    }
    return newList
  } catch (err) {
    console.log(`Update ${model.definition.name}: ${err}`)
    throw err
  }
}

module.exports = CustomCRUD