import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError as observableThrowError} from "rxjs";

import { ProductModel} from '../models/product.model';


@Injectable()
export class ProductsService {
  private url: String = '/api/products';

    constructor(private http: HttpClient) {
    }

  getProducts(): Observable<ProductModel[]>{
    return  this.http.get<ProductModel[]>(`${ this.url }`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  addProduct(product: ProductModel){
    return  this.http.post<ProductModel>(`${ this.url }`, product)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  editProduct(product: ProductModel){
    return  this.http.put<ProductModel>(`${ this.url }/${product.productId}`, product)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteProduct(productId: number){
    return  this.http.delete(`${ this.url }/${productId}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
    errorHandler(error: HttpErrorResponse){
          return observableThrowError(error)
    }
}
