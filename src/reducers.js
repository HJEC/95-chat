//src/reducers.js

export default function reducer(state = {}, action) {
    if (action.type == "GET_FRIENDS_WANNABES") {
        //something
        state = {
            ...state,
            friends: action.friends
        };
        // immutable array methods:
        //map - good for changing item(s) in an array
        //filter - good for filtering item(s) OUT of an array
        //concat - used to add arrays together to make a new array
        //...(spread operator) - will copy everything (arrays and objects), and allow for additional information.
        // Object.assign - make copies of objects
    }
    if (action.type == "ACCEPT_FRIENDSHIP") {
        state = {
            ...state,
            friends: state.friends.map(i => {
                if (i.id == action.id) {
                    return {
                        ...i,
                        accepted: true
                    };
                }
                return i;
            })
        };
    }
    if (action.type == "END_FRIENDSHIP") {
        state = {
            ...state,
            friends: state.friends.filter(i => i.id !== action.id)
        };
    }
    return state;
}
