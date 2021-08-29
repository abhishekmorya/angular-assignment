import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SubCategory } from "../models/sub-category.model";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  _subCategory = new BehaviorSubject<SubCategory[]>([]);

  constructor(private http: HttpClient){}

  get subCategory() {
    return this._subCategory.asObservable();
  }

  fetchAll() {
    return this.http.get<SubCategory[]>('http://localhost:8000/sub-category/').toPromise();
  }
}
