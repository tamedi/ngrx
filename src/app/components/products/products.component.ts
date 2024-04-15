import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ProductsState, ProductsStateEnum} from '../../ngrx/products.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsState$:Observable<ProductsState>|null=null;
  readonly ProductsStateEnum= ProductsStateEnum; // declaration de l'enum
  constructor(private store:Store<any>) { }

  ngOnInit(): void {
    // jecoute le store et quand je recois les donnéés, je vais retourner catalogueState
    this.productsState$=this.store.pipe(
      map((state)=>  state.catalogState) // je met pas de return car jai pas mis les {}
    );
  }
}
