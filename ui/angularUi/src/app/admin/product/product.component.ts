import { Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../common/services/product.service';
import {CategoryService} from '../../common/services/category.service';
import { Category } from '../../model/category';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'  ,
  styleUrls: ['./product.component.css'],
  providers: [ProductService, CategoryService],
})
export class ProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute) { }
  products: Product[];
  product: any = {};
  categories: Category[];



  ngOnInit() {
    this.product.defaultImageUrl = '/productImages/noimage.jpg';
    this.product.isActive = 'No';
    this.getCategories();
    this.getProductsAll();
  }


  getProductsAll() {
      this.productService.getProductsAll().subscribe(p => (this.products = p));
  }

  addProduct(product: Product) {
    this.productService.addProduct(product);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
    this.getProductsAll();
  }

  getCategories() {
    this.categoryService.getCategory().subscribe(c => (this.categories = c));
  }

}
