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

// async function listRelationsFilter() {
//     relations = model.definition.relations
//     console.log(relations)
// }

// async function readRelationsFilter() {

// }

async function listAPIReturns(model, object) {
    properties = model.definition.properties
    listObject = new Object();
    Object.keys(properties).forEach(item => {
        if (properties[item].extendOptions != undefined && properties[item].extendOptions.showList == true) {
            // delete object[item]
            // console.log(item)
            listObject[item] = object[item]
        }
      });

      relations = model.definition.relations
      Object.keys(relations).forEach(item => {
          if (relations[item].extendOptions != undefined && relations[item].extendOptions.showList == true) {
            //   delete object[item]
            //   console.log(item)
            listObject[item] = listAPIReturns(app.models[realtions.model], object[item])
          }
      })
    //   console.log(object)
      return listObject
}

module.exports = {
    // listFieldsFilter: listFieldsFilter,
    // listRelationsFilter: listRelationsFilter,
    // readRelationsFilter: readRelationsFilter
    listAPIReturns: listAPIReturns
}