const DrillValueUnits = {
    Pounds : {
        name : "Pounds",
        acronym : "lbs"
    },
    Kilograms : {
        name : "Kilograms",
        acronym : "kgs"
    },
    Miles : {
        name : "Miles",
        acronym : "mi"
    },
    Kilometers : {
        name : "Kilometer",
        acronym : "km"
    },
    Meters : {
        name : "Meters",
        acronym : "m"
    },
    Feat : {
        name : "Feat",
        acronym : "ft"
    },
    Time : {
        name : "Time",
        acronym : undefined
    },

}

let drillTypeID = 1;

const DrillTypes = {
    Weight : {
        id : drillTypeID++,
        name : "Weight",
        units : [DrillValueUnits.Pounds, DrillValueUnits.Kilograms],
        hasReps : true,
        isTimedByDefault : false
    },
    Distance : {
        id : drillTypeID++,
        name : "Distance",
        units : [DrillValueUnits.Kilometers,DrillValueUnits.Meters, DrillValueUnits.Miles, DrillValueUnits.Feat],
        hasReps : false,
        isTimedByDefault : true
    },
    BodyWeight : {
        id : drillTypeID++,
        units : [],
        hasReps : true,
        isTimedByDefault : false
    }
}

let drillID = 1;

const DrillSections = [
    {
        sectionName : "Weightlifting",
        drills : [{
            id : drillID++,
            name : "Squat Clean",
            type : DrillTypes.Weight
        },
        {
            id : drillID++,
            name : "Power Clean",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Muscle Clean",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Hang Squat Clean",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Hang Power Clean",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Tall Clean",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Squat Snatch",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Power Snatch",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Muscle Snatch",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Hang Squat Snatch",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Hang Power Snatch",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Tall Snatch",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Split Jerk",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Push Jerk",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Tall Jerk",
            type : DrillTypes.Weight
        }, {
            id : drillID++,
            name : "Squat Jerk",
            type : DrillTypes.Weight
        }]
    },{
        sectionName : "Powerlifting",
        drills : [{
            id : drillID++,
            name : "Back Squat",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Deadlift",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Bench Press",
            type : DrillTypes.Weight
        }]
    },{
        sectionName : "Aerobic",
        drills : [{
            id : drillID++,
            name : "Run",
            type : DrillTypes.Distance
        },{
            id : drillID++,
            name : "Swim",
            type : DrillTypes.Distance
        },{
            id : drillID++,
            name : "Row",
            type : DrillTypes.Distance
        },{
            id : drillID++,
            name : "Air Bike",
            type : DrillTypes.Distance
        },{
            id : drillID++,
            name : "Double Unders",
            type : DrillTypes.BodyWeight
        }]
    },{
        sectionName : "Gymnastics",
        drills : [{
            id : drillID++,
            name : "Kipping Ring Muscle up",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Strict Ring Muscle up",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Kipping Bar Muscle up",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Strict Bar Muscle up",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Kipping Toes to bar",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Strict Toes to bar",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Kipping Chest to bar",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Strict Chest to bar",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Butterfly Chest to bar",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Kipping Pull up",
            type : DrillTypes.BodyWeight
        }, {
            id : drillID++,
            name : "Strict Pull up",
            type : DrillTypes.BodyWeight
        }, {
            id : drillID++,
            name : "Butterfly Pull up",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Butterfly Chest to bar",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Kipping Hand stand push up",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Strict Hand stand push up",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Strict Ring Dips",
            type : DrillTypes.BodyWeight
        },{
            id : drillID++,
            name : "Kipping Ring dips",
            type : DrillTypes.BodyWeight
        }]
    }, {
        sectionName : "Weight Training",
        drills : [{
            id : drillID++,
            name : "Shoulder Press",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Push Press",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Front Squat",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Over Head Squat",
            type : DrillTypes.Weight
        },{
            id : drillID++,
            name : "Thruster",
            type : DrillTypes.Weight
        }]
    }
]

export {
    DrillSections,
    DrillTypes,
    DrillValueUnits
}