import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { SubCategory } from '../models/sub-category.model';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { SubCategoryService } from '../services/sub-category.service';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  filteredCategories: SubCategory[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    this.categories = await this.categoryService.fetchAll();
    this.subCategories = await this.subCategoryService.fetchAll();
  }

  addProduct(category: number, subCategory: number, productName: string) {
    const product = new Product(
      null,
      productName,
      category,
      subCategory
    )
    this.productService.addProduct(product);
  }

  filterSubCategory(category: number) {
    this.filteredCategories = this.subCategories.filter(x => x.category === category);
  }
}
