
const ScreenNames = {
    HomeScreen : "Home",
    DetailsScreen : "Details"
}

const Actions = {
    Navigation : {
        LOGIN_SUCCESS : "LOGIN_SUCCESS",
        SEARCH_SCREEN : "SEARCH_SCREEN",
        NEW_RESULT_SCREEN : "NEW_RESULT_SCREEN",
        LOGOUT : "LOGOUT"
    },
    Drawer : {
        OPEN : "DRAWER_OPEN",
        CLOSE : "DRAWER_CLOSE"
    },
    NewResult : {
        SELECT_DRILL : "SELECT_DRILL",
        SAVE_NEW_RESULT : "SAVE_NEW_RESULT",
        SEARCH_DRILL : "SEARCH_DRILL",
        TOGGLE_TIMED : "TOGGLE_TIMED",
        NEXT_DRILL_VALUE_STATE_UNITS : "NEXT_DRILL_VALUE_STATE_UNITS",
        ON_RESULT_CHANGE : "ON_RESULT_CHANGE",
        ON_REPS_CHANGE : "ON_REPS_CHANGE",
        ON_TIME_CHANGE : "ON_TIME_CHANGE",
        RESET_ERROR : "RESET_NEW_RESULT_ERROR"
    },
    Results : {
        UPDATE_RESULTS : "RESULTS_UPDATE"
    }
}

export {
    ScreenNames,
    Actions
}