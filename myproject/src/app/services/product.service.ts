import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take, switchMap, tap, map } from 'rxjs/operators';
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  _products = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient){}

  get products() {
    return this._products;
  }

  fetchAll() {
    return this.http.get<Product[]>(`http://localhost:8000/product/`).pipe(
      map(res => {
        this._products.next(res);
        return res;
      })
    ).toPromise();
  }

  addProduct(product: Product) {
    return this.http.post<Product>('http://localhost:8000/product/', {...product}).pipe(
      take(1),
      map(res => {
        let allProducts:Product[] = [];
        allProducts.push(res);
        allProducts.push(...this._products.getValue());
        return allProducts;
      }),
      tap(res => {
        this._products.next(res);
      })
    ).toPromise();
  }

}
