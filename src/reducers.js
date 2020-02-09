//src/reducers.js
// immutable array methods:
//map - good for changing item(s) in an array
//filter - good for filtering item(s) OUT of an array
//concat - used to add arrays together to make a new array
//...(spread operator) - will copy everything (arrays and objects), and allow for additional information.
// Object.assign - make copies of objects

export default function reducer(state = {}, action) {
    if (action.type == "SET_USER_ID") {
        state = {
            ...state,
            user: action.user
        };
    }

    if (action.type == "TOGGLE_UPLOADER") {
        state = {
            ...state,
            visibility: !state.visibility
        };
    }
    if (action.type == "SET_IMAGE") {
        state = {
            ...state,
            user: {
                ...state.user,
                image: action.image
            }
        };
    }
    if (action.type == "SET_BIO") {
        state = {
            ...state,
            user: {
                ...state.user,
                bio: action.bio
            }
        };
    }

    if (action.type == "GET_FRIENDS_WANNABES") {
        //something
        state = {
            ...state,
            friends: action.friends
        };
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
    if (action.type == "SET_TIME") {
        state = {
            ...state,
            time: action.time
        };
    }
    return state;
}
