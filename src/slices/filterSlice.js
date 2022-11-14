import { createSlice, current } from "@reduxjs/toolkit";


/*
export const filterReducer = (
  state = JSON.parse(localStorage.getItem("reduxState")) || [],
  action
) => {
  switch (action.type) {
    case "@filter/search":
      return [...state.filter((item, index) => {
        console.log('favorite/search: ', item.title)
        console.log('//action: ', action.payload.title)
        if(action.payload.title.search(item.title) !== -1){
          console.log('coincide')
        }
        //item.title.search(action.payload.title)
        return item.title.search(action.payload.title) !== -1;
      })];
      
      break;

    case "@filter/filtrarFecha":
      return [...state.sort((a, b) => a.fecha - b.fecha)];
      break;

    case "@filter/filtrarLikes":
      return [...state.sort((a, b) => a.likes - b.likes)];
      break;

      default:
        return state;
  }
};



export const actionSearchFavorite = (title) => {
    return {
      type: "@filter/search",
      payload: {
        title: title,
      },
    };
  };
  
  export const actionFiltrarFavorite = () => {
    return {
      type: "@filter/filtrarFecha",
    };
  };
  export const actionFiltrarLikes = () => {
    return {
      type: "@filter/filtrarLikes",
    };
  };

  */


export const filterSlice = createSlice({
    name: 'filter',
    initialState: JSON.parse(localStorage.getItem("reduxState")) || [],
    reducers: {
        actionFilterSearch: (state, action) => {
          
            state.filter((item, index) => {
              console.log('estado actual', current(state));
                console.log('//action: ', action.payload)
                if(item.description === null){
                  console.log('descripcion es null')
                  return state
                }else{
                  if(action.payload.search(item.description) !== -1){
                    console.log('coincide')
                  }
                  //item.title.search(action.payload.title)
                  return item.description.search(action.payload) !== -1;
                }
              })
        },
        actionFilterFecha: (state, action) => {
          console.log(state)
            return state.sort((a, b) => a.fecha - b.fecha)
        },
        actionFilterLikes: (state, action) => {
          console.log(state)
            return state.sort((a, b) => a.likes - b.likes)
        }
    }
})

export const {actionFilterSearch, actionFilterFecha, actionFilterLikes} = filterSlice.actions
export default filterSlice.reducer;