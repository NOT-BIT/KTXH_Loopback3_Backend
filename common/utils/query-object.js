let app = require('../../server/server')

// async function listFieldsFilter(model) {
//     console.log(model.definition)
//     console.log(model.definition.relations)
//     // properties = model.definition.rawProperties
//     properties = model.definition.properties
//     listFieldsFilter = new Object();
//     Object.keys(properties).forEach(item => {
//         if (properties[item].extendOptions != undefined && properties[item].extendOptions.showList == true) {
//             listFieldsFilter[item] = true;
//         }
//       });
//       console.log(listFieldsFilter)
//       return listFieldsFilter
// }

function listRelationsFilter(model) {
    relations = model.definition.settings.relations
    listRelation = []
    Object.keys(relations).forEach(item => {
        if (relations[item] != undefined && relations[item].extendOptions != undefined && relations[item].extendOptions.showList == true) {
            listRelation.push(item)
        }
    })
    console.log(listRelation)
    return listRelation
}

function readRelationsFilter(model) {
    relations = model.definition.settings.relations
    readRelation = []
    Object.keys(relations).forEach(item => {
        if (relations[item].extendOptions != undefined && relations[item].extendOptions.showRead == true) {
            listObject.push(item)
        }
    })
    return readRelation
}

function listAPIReturns(model, object) {
    // console.log(model)
    var properties = model.definition.properties
    var listObject = new Object();
    Object.keys(properties).forEach(item => {
        if (properties[item].extendOptions != undefined && properties[item].extendOptions.showList == true) {
            listObject[item] = object[item]
        }
      });

      var relations = model.definition.settings.relations
      Object.keys(relations).forEach(item => {
        // console.log(item)
          if (relations[item] != undefined && relations[item].extendOptions != undefined && relations[item].extendOptions.showList == true) {
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
    // listFieldsFilter: listFieldsFilter,
    listRelationsFilter: listRelationsFilter,
    readRelationsFilter: readRelationsFilter,
    listAPIReturns: listAPIReturns,
    listAPIReturnsList: listAPIReturnsList
}