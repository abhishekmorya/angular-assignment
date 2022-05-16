import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
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
    return this.http.get<SubCategory[]>(environment.apiLinks.subCategory).toPromise();
  }
}
