import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import { ProductService } from '../common/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../common/services/cart.service';
import { Pager } from '../model/pager';


@Component({
  selector: 'app-site-product',
  templateUrl: './site-product.component.html',
  styleUrls: ['./site-product.component.css'],
  providers: [ProductService]
})


export class SiteProductComponent implements OnInit {
  products: Product[];
  pager: Pager = new Pager();
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getProducts(params['catId']);
    });
  }
  getProducts(catId: string) {
    this.productService.getProducts(catId, null, null).subscribe(p => {
      this.products = p;
      this.pager = this.getPager(p.length);
    });

  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  getPager(totalItems: number , currentPage: number = 1, pageSize: number = 3): Pager {
    // totalItems = this.productService.getTotalProducts(catId);
    const totalPages = Math.ceil(totalItems / pageSize);
    const pages: Array<number> = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    const pager = new Pager();
    pager.currentPage = currentPage;
    pager.pageList = pages;
    pager.pageSize = pageSize;
    return pager;
  }
  
  setPage(page: number) {
    this.pager.currentPage = page;
  }
}
