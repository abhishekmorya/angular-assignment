import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, take } from 'rxjs/operators';

import { Category } from './models/category.model';
import { Product } from './models/product.model';
import { SubCategory } from './models/sub-category.model';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { SubCategoryService } from './services/sub-category.service';

interface IData {
  category: string;
  subCategory: string;
  product: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['product', 'subCategory', 'category'];
  products: Product[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  data: IData[] = [];
  dataSource: MatTableDataSource<IData> = new MatTableDataSource<IData>(
    this.data
  );

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private productService: ProductService
  ) {
    this.fetchAllData();
  }

  async fetchAllData() {
    this.products = await this.productService.fetchAll();
    this.categories = await this.categoryService.fetchAll();
    this.subCategories = await this.subCategoryService.fetchAll();
    this.fillDataSource();
  }

  fillDataSource() {
    this.data = [];
    this.products.forEach((x) => {
      this.data.push({
        category: this.categories.filter((c) => c.id === x.category)[0].name,
        subCategory: this.subCategories.filter(
          (c) => c.id === x.sub_category
        )[0].name,
        product: x.name,
      });
    });
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async updateDataSource() {
    this.productService.products.subscribe((res) => {
      this.products = res;
      if (
        this.products.length > 0 &&
        this.categories.length > 0 &&
        this.subCategories.length > 0
      ) {
        this.fillDataSource();
      }
    });
  }

  ngOnInit() {
    this.updateDataSource();
  }
}
