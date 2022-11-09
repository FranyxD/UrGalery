export const favoriteReducer = (
  state = JSON.parse(localStorage.getItem("reduxState")) || [],
  action
) => {
  switch (action.type) {
    case "@favorites/add":
      return [...state, action.payload];
      break;

    case "@favorites/remove":
        //console.log([...state.filter((item) => console.log('items', item))])
      return [...state.filter((item) => item.id !== action.payload.id)];
      break;

      case "@favorites/filtrarFecha":
        return [...state.sort((a, b) => a.fecha - b.fecha)];
      break;

      case "@favorites/filtrarLikes":
        return [...state.sort((a, b) => a.likes - b.likes)];
      break;

    default:
      return state;
      break;
  }
};

export const actionAddFavorite = (data, fecha) => {
  return {
    type: "@favorites/add",
    payload: {
      id: data[0],
      url: data[1],
      likes: data[2],
      title: data[3],
      fecha: fecha,
    },
  };
};

export const actionRemoveFavorite = (data) => {
  return {
    type: "@favorites/remove",
    payload: {
      id: data,
    },
  };
};

export const actionFiltrarFavorite = () => {
    return {
      type: "@favorites/filtrarFecha",
    };
}
export const actionFiltrarLikes = () => {
    return {
      type: "@favorites/filtrarLikes",
    };
}

