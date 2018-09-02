import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../common/services/product.service';
import { CategoryService } from '../../common/services/category.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(private productService: ProductService,
    private categoryService: CategoryService) { }
  product: any = {};
  categories: Category[];
  ngOnInit() {
    this.getCategories();
  }

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe(p => (this.product = p));
  }
  getCategories() {
    this.categoryService.getCategory().subscribe(c => (this.categories = c));
  }

  editProduct(product: Product) {
    this.productService.editProduct(product);
  }
}
