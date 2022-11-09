import axios from "axios";
import { fotosGeneradas, getUrl } from "../services/services";

export const searchReducer = (state = [], action) => {
    switch(action.type){
        case '@search/Result':
            return action.payload
            break;
        default:
            return state;
            break;
    }
}

export const actionSearch = valor =>{
    return async dispatch =>{
        const fotos = await fotosGeneradas(valor);
        dispatch({
            type: '@search/Result',
            payload: fotos
        })
    }
    
}
