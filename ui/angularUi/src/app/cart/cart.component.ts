import { Component, OnInit } from '@angular/core';
import { CartService } from '../common/services/cart.service';
import { Product } from '../model/product';
import { CartItem } from '../model/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  cartItems: CartItem[];
  ngOnInit() {
    this.cartItems = this.cartService.listToCart();
  }

  removeToCart(product: Product) {
   this.cartService.removeFromCart(product);
  }

}
