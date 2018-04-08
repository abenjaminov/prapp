import { DrillSections, DrillTypes } from '../../Data/Data'
import { Actions } from '../lib/Consts'
import { HashCode } from '../lib/Utils'
import Storage from '../lib/Storage';

const NewResultActions = Actions.NewResult;

let initialState = {
    pickedDrill : {},
    result : "",
    drillType : {},
    history : {},
    searchText : "Search for a drill...",
    searchSections : [{sectionName : "Recent Search", data : []}],
    error : null
}

function newResult(state = initialState, action) {
    switch (action.type) {
      case NewResultActions.SELECT_DRILL:
        return { ...state, pickedDrill : generatePickedDrill(action.drill)}
      case NewResultActions.SEARCH_DRILL:
        return {...state , searchText : action.searchText, searchSections : searchTextChanged(action.searchText)}
      case NewResultActions.TOGGLE_TIMED : {
          return {...state, pickedDrill : {...state.pickedDrill, isTimed : !state.pickedDrill.isTimed}}
      }
      case NewResultActions.NEXT_DRILL_VALUE_STATE_UNITS : {
          const nextUnitIndex = (state.pickedDrill.drillValueState.currentUnitIndex + 1) % state.pickedDrill.type.units.length;

          return {...state,pickedDrill : {
                    ...state.pickedDrill, 
                    drillValueState : {
                        ...state.pickedDrill.drillValueState,
                        currentUnitIndex : nextUnitIndex,
                        units : state.pickedDrill.type.units[nextUnitIndex]
                        }
                    }
                }
      }
      case NewResultActions.ON_RESULT_CHANGE : {
        return {...state, pickedDrill : {...state.pickedDrill, drillValueState : {...state.pickedDrill.drillValueState, value : action.result}}}
      }
      case NewResultActions.ON_REPS_CHANGE : {
        if(Number(action.reps) < 0) {
            action.reps = 0;
        }

        return {...state, pickedDrill : {...state.pickedDrill, reps : action.reps}}
      }
      case NewResultActions.ON_TIME_CHANGE : {

        if(Number(action.minutes) < 0) {
            action.minutes = 0;
        }

        if(Number(action.seconds) < 0) {
            action.seconds = 0;
        } else if(Number(action.seconds) > 59) {
            action.seconds = 59;
        }

        return {...state, pickedDrill : {
            ...state.pickedDrill, 
            drillValueState : {
                ...state.pickedDrill.drillValueState, 
                timedValue : {
                    minutes : action.minutes, 
                    seconds : action.seconds
                }
            }
          }
        }
      }
      case NewResultActions.SAVE_NEW_RESULT : {
          if(!state.pickedDrill.id) {
              return {...state, error : {title : "Fields missing", message : "Pick a drill"}}
          } else if(state.pickedDrill.type !== DrillTypes.BodyWeight && state.pickedDrill.drillValueState.value === 0 || state.pickedDrill.drillValueState.value < 0) {
              return {...state, error : {title : "Invalid value", message : "Value must be more than zero"}}
          } else if(state.pickedDrill.isTimed && (state.pickedDrill.drillValueState.timedValue.minutes === 0 && state.pickedDrill.drillValueState.timedValue.seconds === 0) || 
                                                  (state.pickedDrill.drillValueState.timedValue.minutes < 0 || state.pickedDrill.drillValueState.timedValue.seconds < 0)) {
            return {...state, error : {title : "Invalid value", message : "Value must be more than zero"}}
          } else {
            let objectToSave = generateObjectToSave(state.pickedDrill);

            FinishSaveStorageItem(objectToSave);

            return initialState;
          }
      }
      case NewResultActions.RESET_ERROR : {
        return {...state, error: null};
      }
      default:
        return state;
    }
  }

const FinishSaveStorageItem = (objectToSave) => {
    Storage.GetAllStorageItems((allMatchingItems) => {
        console.log(allMatchingItems);
        if(allMatchingItems.length === 0) {
            objectToSave.isPersonalBest = true;
        }

        Storage.SaveStorageItem(objectToSave.key, objectToSave, (error) => {
            console.log(error);
          });
    }, (item) => {
        return (item.id === objectToSave.id) && !isResultBetter(objectToSave, item);
    });
}

const isResultBetter = (newResult, oldResult) => {
    if(newResult.timedValue && oldResult.timedValue) {
        // If times are equal
        if(newResult.timedValue.minutes === oldResult.minutes &&
            newResult.timedValue.seconds === oldResult.seconds) {
            if(newResult.reps && oldResult.reps) { // If the drill has reps
                if(newResult.reps > oldResult.reps) { // If the new result has more reps
                    return true;
                }
            } else if(newResult.value > oldResult.value) { // If the new result has a greater value
                return true;
            }
        } else { // If times are not equal
            if((newResult.reps && oldResult.reps && newResult.reps === oldResult.reps) || 
                (newResult.value === oldResult.value)) { // If the number of reps are the same OR the value is the same
                if(newResult.timedValue.minutes < oldResult.timedValue.minutes) {
                    return true;
                } else if(newResult.timedValue.minutes === oldResult.timedValue.minutes &&
                            newResult.timedValue.seconds < oldResult.timedValue.seconds) {
                    return true;
                }
            } 
        }
    } else { // If the drill is not timed
        if(newResult.reps && oldResult.reps) { // If the drill has reps
            if(newResult.reps > oldResult.reps) { // If the new result has more reps
                return true;
            } else if (newResult.reps === oldResult.reps && newResult.value > oldResult.value) {
                return true;
            }
        } else if(newResult.value > oldResult.value) { // If the new result has a greater value
            return true;
        }
    }

    return false;
}

const generateObjectToSave = (drill) => {
    let objectToSave = {};

    // Set the value of the result
    objectToSave.value = drill.drillValueState.value;

    // Check if the result has a timed value
    if(drill.isTimed) {
        objectToSave.timedValue = drill.drillValueState.timedValue;
    }

    // Check if the units of the result are relevant
    if(drill.type.units.length) {
        objectToSave.units = drill.drillValueState.units
    }

    // Check if the result has reps
    if(drill.type.hasReps) {
        objectToSave.reps = drill.reps;
    }

    // Get the date of the result and determine if it is a personal best
    objectToSave.dateTime = new Date();
    objectToSave.key = drill.id + "-" + HashCode(objectToSave.dateTime.toString());
    objectToSave.typeID = drill.type.id;
    objectToSave.name = drill.name;
    objectToSave.id = drill.id;

    return objectToSave;
}

const generatePickedDrill = (drill) => {
    
    let pickedDrill = {
        id : drill.id, 
        name : drill.name, 
        type : drill.type,
        isTimed : drill.type.isTimedByDefault,
        drillValueState : drill.type.units.length ? { 
            value : 0,
            timedValue : {
                minutes : 0,
                seconds : 0
            },
            currentUnitIndex : 0,
            units : drill.type.units[0]
        } : {
            value : 0,
            timedValue : {
                minutes : 0,
                seconds : 0
            }
        }
    }

    if(drill.type.hasReps) {
        pickedDrill.reps = 1;
    }

    return pickedDrill;
}

const searchTextChanged = (text) => {

    searchSections = [{sectionName : "Recent Search", data : []}];

    if(text !== '') {
        for(var nSectionIndex = 0; nSectionIndex < DrillSections.length;nSectionIndex++) {
            var section = DrillSections[nSectionIndex];
            var sectionIncluded = false;

            if(section.sectionName.includes(text)) {
                searchSections.push({sectionName : section.sectionName, data : section.drills});
                sectionIncluded = true;
            } else {
                for(var nDrillIndex = 0; nDrillIndex < section.drills.length;nDrillIndex++) {
                    var drill = DrillSections[nSectionIndex].drills[nDrillIndex];

                    if(drill.name.includes(text)) {
                        if(!sectionIncluded) {
                            searchSections.push({sectionName : section.sectionName, data : []});
                            sectionIncluded = true;
                        }
        
                        searchSections[searchSections.length - 1].data.push(drill);
                    }
                }    
            }
        }
    }

    return searchSections;
}

  export default newResult;