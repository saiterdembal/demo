import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShippingDetail } from '../model/shipping-detail';
import { CartService } from '../common/services/cart.service';

@Component({
  selector: 'app-shipping-detail',
  templateUrl: './shipping-detail.component.html',
  styleUrls: ['./shipping-detail.component.css']
})
export class ShippingDetailComponent implements OnInit {

  constructor(private cartService: CartService) { }
  model: ShippingDetail = new ShippingDetail('', '', true, -1);
  cities = [];


  ngOnInit() {
    this.cities.push(
      { 'id': '1', 'name': 'Ankara' },
      { 'id': '2', 'name': 'Antalya' },
      { 'id': '3', 'name': 'İstanbul' }

    );
  }
  checkout( form: NgForm) {
    alert('Shopping complete !');
    this.cartService.clearToCart();

  }

}
