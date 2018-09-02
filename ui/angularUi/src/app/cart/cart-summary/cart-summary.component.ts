import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '../../common/services/cart.service';
import { CartItem } from '../../model/cart-item';
import { Product } from '../../model/product';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit, DoCheck {

  cartItems: CartItem[];
  totalCartItem: number;
  totalCartItemPrice: number;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.listToCart();
  }

  ngDoCheck() {
    this.totalCartItem = this.cartService.listToCart().reduce((a, b) => a + b.quantity, 0);
    this.totalCartItemPrice = this.cartService.listToCart().reduce(
      (a, b) => a + b.quantity * b.product.unitPrice, 0);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

}
