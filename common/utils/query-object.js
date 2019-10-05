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

function listAPIReturns(model, object) {
    var properties = model.definition.properties
    let listObject = {};
    Object.keys(properties).forEach(item => {
        if (object[item] != undefined
            && properties[item].extendOptions != undefined
            && properties[item].extendOptions.showList == true) {
           listObject[item] = object[item]
        }
      });

      var relations = model.definition.settings.relations
      Object.keys(relations).forEach(item => {
          if (object[item]
              && relations[item] != undefined
              && relations[item].extendOptions != undefined
              && relations[item].extendOptions.showList == true) {
                  listObject[item] = listAPIReturns(app.models[relations[item].model], object[item])
          }
      })
      return listObject
}

function listAPIReturnsList(model, listData){
    let i
    let listReturn = []
    for (i in listData){
        listReturn.push(listAPIReturns(model, listData[i]))
    }
    return listReturn
}

module.exports = {
    listRelationsFilter: listRelationsFilter,
    readRelationsFilter: readRelationsFilter,
    listAPIReturns: listAPIReturns,
    listAPIReturnsList: listAPIReturnsList
}