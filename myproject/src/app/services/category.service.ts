import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
  _category = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient){}

  get category() {
    return this._category.asObservable();
  }

  fetchAll() {
    return this.http.get<Category[]>('http://127.0.0.1:8000/category/').toPromise();
  }
}
