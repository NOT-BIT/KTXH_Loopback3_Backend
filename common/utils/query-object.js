let app = require('../../server/server')

function listRelationsFilter(model) {
    relations = model.definition.settings.relations
    listRelation = []
    Object.keys(relations).forEach(item => {
        if (relations[item] != undefined
            && relations[item].extendOptions != undefined
            && relations[item].extendOptions.showList == true) {
            listRelation.push(item)
        }
    })
    return listRelation
}

function readRelationsFilter(model) {
    relations = model.definition.settings.relations
    listRelation = []
    Object.keys(relations).forEach(item => {
        if (relations[item] != undefined
            && relations[item].extendOptions != undefined
            && relations[item].extendOptions.showRead == true) {
            listRelation.push(item)
        }
    })
    return listRelation
}

function listAPIReturns(model, object, flag) {
    if (!object) {
      return null
    }
    var properties = model.definition.properties
    let listObject = {};
    listObject.id = object.id
    Object.keys(properties).forEach(item => {
        if (object[item] != undefined
            && properties[item].extendOptions != undefined
            && properties[item].extendOptions.showList == true){
                listObject[item] = object[item]
        }
      });
    if (flag == true){
      var relations = model.definition.settings.relations
      Object.keys(relations).forEach(item => {
          if (object[item] != undefined
              && relations[item] != undefined
              && relations[item].extendOptions != undefined
              && relations[item].extendOptions.showList == true) {
                  tmpObject = listAPIReturns(app.models[relations[item].model], object[item], true)
                  if (tmpObject != null) {
                    listObject[item] = tmpObject
                  }
          }
      })
    }
      return listObject
}

function listAPIReturnsList(model, listData, flag){
    let i
    let listReturn = []
    for (i in listData){
        listReturn.push(listAPIReturns(model, listData[i], flag))
    }
    return listReturn
}

module.exports = {
    listRelationsFilter: listRelationsFilter,
    readRelationsFilter: readRelationsFilter,
    listAPIReturns: listAPIReturns,
    listAPIReturnsList: listAPIReturnsList
}