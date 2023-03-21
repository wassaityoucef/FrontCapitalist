import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../world';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private router: Router){}
  product: Product = new Product;
 @Input()
 set prod(value: Product) {
 this.product = value;
 }

}
