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
    readRelation = []
    Object.keys(relations).forEach(item => {
        if (relations[item].extendOptions != undefined && relations[item].extendOptions.showRead == true) {
            listObject.push(item)
        }
    })
    return readRelation
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


function test () {
    let a = {
        age: 1,
        name: 'vuong'
    }

    let b = {
        age: 2,
        name: 'vuong2'
    }

    a.noname = b;
    return a;
    
}


module.exports = {
    listRelationsFilter: listRelationsFilter,
    readRelationsFilter: readRelationsFilter,
    listAPIReturns: listAPIReturns,
    listAPIReturnsList: listAPIReturnsList,
    test: test
}