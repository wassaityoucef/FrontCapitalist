import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../world';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  server: string = 'http://localhost:4000';
  lastupdate = 0;
  progressbarvalue = 0;
  

  constructor(private router: Router){}
  product: Product = new Product;
 @Input()
 set prod(value: Product) {
 this.product = value;
 }

 _qtmulti!: string;
 @Input()
 set qtmulti(value: string) {
 this._qtmulti = value;
 //if (this._qtmulti && this.product) this.calcMaxCanBuy();
 }

 _wmoney!: number;
 @Input()
 set wmoney(value: number) {
 this._wmoney = value;
 //if (this._qtmulti && this.product) this.calcMaxCanBuy();
 }


 @Output() 
 notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();

 ngOnInit() {
  setInterval(() => {
    this.calcScore();
  }, 100);
}

calcScore() {
  if(this.product.timeleft != 0){
    let tempsmoins = Date.now() - this.lastupdate;
    this.product.timeleft -= tempsmoins;
      if(this.product.timeleft<=0){
        this.product.timeleft=0;
        this.notifyProduction.emit(this.product);
        this.progressbarvalue=0;
      }
      else{
        this.progressbarvalue = ((this.product.vitesse -
          this.product.timeleft) / this.product.vitesse) * 100
          
      }
  }
}

 startFabrication() {
  console.log(`Démarrage de la fabrication`);
  this.product.timeleft = this.product.vitesse;
  this.lastupdate = Date.now()
  console.log(this.lastupdate);
}

calcMaxCanBuy() {
console.log("help")
}

}