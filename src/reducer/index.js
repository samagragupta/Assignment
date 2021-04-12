const INITIAL_STATE = {
    users: [],
    page: 1
}

export default function (state = INITIAL_STATE, {type, payload}){
    switch(type){
        case "SET_USERS":
            return {...state, users: [...state.users,...payload], page: state.page + 1};
        default:
            return {...state};
    }
}