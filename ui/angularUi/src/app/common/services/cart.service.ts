import { Injectable } from '@angular/core';
import { Product } from '../../model/product';
import { CART_ITEM_LIST } from '../../model/cart-item-list';
import { CartItem } from '../../model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  addToCart(product: Product) {
    const addedItem = CART_ITEM_LIST.find(t => t.product._id === product._id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      const cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      CART_ITEM_LIST.push(cartItem);
    }
  }

  listToCart() {
    return CART_ITEM_LIST;
  }

  clearToCart() {
    CART_ITEM_LIST.splice(0, CART_ITEM_LIST.length);
  }

  removeFromCart(product: Product) {
    const addedItem = CART_ITEM_LIST.find(t => t.product._id === product._id);
    const indexNo = CART_ITEM_LIST.indexOf(addedItem);
    if (indexNo !== -1) {
      CART_ITEM_LIST.splice(indexNo, 1);
    }
  }
}
