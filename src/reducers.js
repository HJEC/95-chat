//src/reducers.js

export default function reducer(state = {}, action) {
    if (action.type == "WHATEVER_THING") {
        //something
        state = {
            ...state,
            friendsWannabes: "some stuff"
        };

        // immutable array methods:
        //map - good for changing item(s) in an array
        //filter - good for filtering item(s) OUT of an array
        //concat - used to add arrays together to make a new array
        //...(spread operator) - will copy everything (arrays and objects), and allow for additional information.
        // Object.assign - make copies of objects
        return state;
    }
    if (action.type == "WHATEVER_THING") {
        //something
    }
    if (action.type == "WHATEVER_THING") {
        //something
    }
    if (action.type == "WHATEVER_THING") {
        //something
    }
    return state;
}
