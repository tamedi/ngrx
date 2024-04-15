import {Product} from '../model/product.model';
import {ProductsActions, ProductsActionsTypes} from './products.actions';
import {Action} from '@ngrx/store';

export enum ProductsStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial"
}
export interface ProductsState{
    products:Product[],
    errorMessage:string,
    dataState:ProductsStateEnum
}
//il faut donner un état initial du state
const initState:ProductsState={
  products:[],
  errorMessage:"",
  dataState:ProductsStateEnum.INITIAL
}

//creation du reducer
// le reducer recoit du store : le state et l'action et apres il fait le test
export function productsReducer(state=initState, action:Action):ProductsState {
  switch (action.type) {
    case ProductsActionsTypes.GET_ALL_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING } //...state: cad je prend tout les attribut du state initial (le state est immutable) mais si je fais ça je peux le cloner
    case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload}
    case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload}
    /* Get Selected Products*/
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING }
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload}
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload}
    default : return {...state} // cad sinon on retourne une action qui contient le même state
  }
}
