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

async function listRelationsFilter() {
    relations = model.definition.settings.relations
    listRelation = []
    Object.keys(relations).forEach(item => {
        if (relations[item].extendOptions != undefined && relations[item].extendOptions.showList == true) {
            listRelation.push(item)
        }
    })
    return listRelation
}

async function readRelationsFilter() {
    relations = model.definition.settings.relations
    readRelation = []
    Object.keys(relations).forEach(item => {
        if (relations[item].extendOptions != undefined && relations[item].extendOptions.showRead == true) {
            listObject.push(item)
        }
    })
    return readRelation
}

async function listAPIReturns(model, object) {
    // console.log(model)
    properties = model.definition.properties
    listObject = new Object();
    Object.keys(properties).forEach(item => {
        if (properties[item].extendOptions != undefined && properties[item].extendOptions.showList == true) {
            listObject[item] = object[item]
        }
      });

      relations = model.definition.settings.relations
      Object.keys(relations).forEach(item => {
          if (relations[item].extendOptions != undefined && relations[item].extendOptions.showList == true) {
            //   console.log(object)
            //   console.log(object.belongsToQTDonVi)
            listObject[item] = listAPIReturns(app.models[relations[item].model], object[item])
          }
      })
      return listObject
}

module.exports = {
    // listFieldsFilter: listFieldsFilter,
    listRelationsFilter: listRelationsFilter,
    readRelationsFilter: readRelationsFilter,
    listAPIReturns: listAPIReturns
}