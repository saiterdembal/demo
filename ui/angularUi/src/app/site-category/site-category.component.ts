import { Component, OnInit, HostBinding } from '@angular/core';
import { CategoryService } from '../common/services/category.service';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { ProductService } from '../common/services/product.service';
import { merge, Observable } from 'rxjs';

@Component({
  selector: 'app-site-category',
  templateUrl: './site-category.component.html',
  styleUrls: ['./site-category.component.css'],
  providers: [CategoryService, ProductService]
})
export class SiteCategoryComponent implements OnInit {
  categories: Category[];
  catId: string;
  productCount;
  productCountMap: Map<string, number>;
  constructor(private categoryService: CategoryService,
    private productService: ProductService) {
    this.productCountMap = new Map<string, number>();
  }
  ngOnInit() {
    this.getCategories();
  }

  getCount(catId: string): number {
    this.productCount = this.productCountMap.get(catId);
    return this.productCount;
  }

  getCategories() {
    this.categoryService.getCategory().subscribe(c => {
      this.categories = c;
      this.categories.forEach(cat => {
        this.productService.getTotalProducts(cat._id)
          .subscribe(data => {
            this.productCountMap.set(cat._id, data.count);
        } );
      });
    });
  }
}
