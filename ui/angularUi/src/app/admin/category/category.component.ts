import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../common/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}
  categories: Category[];
  category: any = {};

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategory().subscribe(c => (this.categories = c));
  }
  addCategory(category: Category) {
    this.categoryService.addCategory(category);
  }
}
