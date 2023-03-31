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
  buymax=0
  

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
 this.wmoney = value;
 //if (this._qtmulti && this.product) this.calcMaxCanBuy();
 }


 @Output() 
 notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();

 ngOnInit() {
  setInterval(() => {
    this.calcScore();
    this.calcMaxCanBuy();
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
let prix : number
let maxbuy : number

maxbuy = Math.floor(Math.log(1 - this._wmoney * (1 - this.product.croissance) / this.product.cout) / Math.log(this.product.croissance))
switch(this._qtmulti) {
  case '1':
     prix = 1*this.product.cout
     this.buymax = Math.floor(prix)
    break;
  case '10':
    prix = this.product.cout * (1 - (1 / (1 + this.product.croissance)) ^ 10) / (1 - (1 / (1 + this.product.croissance)))
    this.buymax = Math.floor(prix)
    break;
  case '100':
    prix = this.product.cout * (1 - (1 / (1 + this.product.croissance)) ^ 100) / (1 - (1 / (1 + this.product.croissance)))
    this.buymax = Math.floor(prix)
    break;
  case 'Max':
    
    prix = this.product.cout * (1 - (1 / (1 + this.product.croissance)) ^ maxbuy) / (1 - (1 / (1 + this.product.croissance)))
    this.buymax = Math.floor(prix);
    break;
  default:
}
}

}