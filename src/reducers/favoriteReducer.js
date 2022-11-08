export const favoriteReducer = (state = [], action) =>{
    switch(action.type){
        case '@favorites/add':
        return [...state, action.payload];
        break;

        default: 
        return state;
        break;
    }
}

export const actionAddFavorite = (url) => {
    return {
        type: '@favorites/add',
        payload: url
    }
}