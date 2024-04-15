import {Injectable} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  GetAllProductsActionError,
  GetAllProductsActionSuccess, GetSelectedProductsActionError,
  GetSelectedProductsActionSuccess,
  ProductsActions,
  ProductsActionsTypes
} from './products.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class ProductsEffects {
  constructor(private productService:ProductService, private effectActions:Actions) {
  }
// je crée un effect qui attend une action, des quil recoit l'action : creatAction, je vais utiliser effectaction.pipe ( c'est comme un subscribe),
// je test si l'action est de type getAllProduct,si c'est le cas je fais mergeMap, je prend l'action que j'ai recu, je fais appelle au service et la methode getAllproduct
// j'attend les résulta et des quil y a un resultat qui arrive dans map => une liste de produit,
// des que jai la liste des produits je retourne une action :new GetAllProductsActionSuccess(products == payload)car l'observable retourne une action : Observable<Action>
  // quand je vais emmetre cett action :new GetAllProductsActionSuccess(products) c'est le reducer qui va la traiter care nous avons un case de SUCCESS
  getAllProductsEffect:Observable<Action>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS), // ofType pour lui dire action de quel type
      mergeMap((action)=>{
            return this.productService.getProducts()
              .pipe(
                map((products)=> new GetAllProductsActionSuccess(products)),
                catchError((err)=>of(new GetAllProductsActionError(err.message)))
              )
      })
    )
  );

  /* Get Selected Products*/
  getSelectedProductsEffect:Observable<Action>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action)=>{
        return this.productService.getSelectedProducts()
          .pipe(
            map((products)=> new GetSelectedProductsActionSuccess(products)),
            catchError((err)=>of(new GetSelectedProductsActionError(err.message)))
          )
      })
    )
  );

}
