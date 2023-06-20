import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Palier, Product } from '../world';
import { WebserviceService } from '../webservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  server: string = 'http://localhost:4000';
  lastupdate = 0;
  progressbarvalue = 0;
  buymax=0;
  nbaffiche=0
  

  constructor(private router: Router,protected service: WebserviceService,private snackBar: MatSnackBar){}
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

 @Output() 
 notifyBuy: EventEmitter<number> = new EventEmitter<number>();

 ngOnInit() {
  setInterval(() => {
    this.calcScore();
    this.calcMaxCanBuy();
    this.tourUnlock(); 
  }, 100);
}

calcScore() {
  if(this.product.managerUnlocked && this.product.timeleft<=0){
    this.startFabrication()
  }
  
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

openSnackBar(message: string, action: string) {
  const snackBarRef = this.snackBar.open(message, action, {
    duration: 2000,
  });
  snackBarRef.afterDismissed().subscribe(() => {
    console.log('Snackbar fermé'); // Action à effectuer lorsque le snackbar est fermé
  });

  snackBarRef.onAction().subscribe(() => {
    snackBarRef.dismiss(); // Fermer manuellement le snackbar lorsque l'action est cliquée
  });
}

 startFabrication() {
  if(this.product.quantite>0){
    this.service.lancerProduction(this.product).catch(reason =>
      console.log("erreur: " + reason)
      ); 
  this.product.timeleft = this.product.vitesse;
  this.lastupdate = Date.now()
}
else{

}
}

buyItem() {
  let prix = 0
  let maxbuy = Math.floor(Math.log(1 - this._wmoney * (1 - this.product.croissance) / this.product.cout) / Math.log(this.product.croissance))
  switch(this._qtmulti) {
    case '1':
   if(this._wmoney>=this.product.cout) {
    if (this.product.quantite<1){
      prix = this.product.cout;
  this.notifyBuy.emit(prix);
  this.product.quantite += 1; 
  this.product.cout *= this.product.croissance;
  this.service.acheterProduit(this.product.id, 1)
    .catch(reason => console.log("erreur: " + reason));
}else {
    prix = this.product.cout;
  this.notifyBuy.emit(prix);
  this.product.revenu += this.product.revenu/this.product.quantite;
  this.product.quantite += 1; 
  this.product.cout *= this.product.croissance;
  this.service.acheterProduit(this.product.id, 1)
    .catch(reason => console.log("erreur: " + reason));
  }
    
}
    break;
    

    case '10':
    prix = this.product.cout*((Math.pow(this.product.croissance,10)-1)/(this.product.croissance - 1))
    
    if(this._wmoney>= prix){
      let calc = 0; 
      for (let i=0;i<10;i++){
        
        calc+= this.product.cout;
        if(this.product.quantite<1){
          this.product.revenu += this.product.revenu;
        }
        else{
          this.product.revenu += this.product.revenu/this.product.quantite;
        }
      this.product.quantite += 1; 
      this.product.cout *= this.product.croissance;
      
    }
    this.service.acheterProduit(this.product.id, 10)
    .catch(reason => console.log("erreur: " + reason));
    this.notifyBuy.emit(prix);
  }
        break;

        case '100':

        prix = this.product.cout*((Math.pow(this.product.croissance,100)-1)/(this.product.croissance - 1))
    if(this._wmoney>= prix){
          for (let i=0;i<100;i++){
    
         
          
            if(this.product.quantite<1){
              this.product.revenu += this.product.revenu;
            }
            else{
              this.product.revenu += this.product.revenu/this.product.quantite;
            }
          this.product.quantite += 1; 
          this.product.cout *= this.product.croissance;
        }
        this.service.acheterProduit(this.product.id, 100)
    .catch(reason => console.log("erreur: " + reason));
        this.notifyBuy.emit(prix);
      }
            break;
      case 'Max' :
        prix = this.product.cout*((Math.pow(this.product.croissance,maxbuy)-1)/(this.product.croissance - 1))
        if(this._wmoney>= prix){
              for (let i=0;i<maxbuy;i++){
        
             
              if(this.product.quantite<1){
                this.product.revenu += this.product.revenu;
              }
              else{
                this.product.revenu += this.product.revenu/this.product.quantite;
              }
              
              this.product.quantite += 1; 
              this.product.cout *= this.product.croissance;
            }
            this.service.acheterProduit(this.product.id, maxbuy)
    .catch(reason => console.log("erreur: " + reason));
            this.notifyBuy.emit(prix);
          }
                break;
    
      }

  }


  calcUnlock(p : Palier) {
    if (p && p.unlocked === false) {
      console.log(p.seuil + p.name);
      if (this.product.quantite >= p.seuil) {
        p.unlocked = true;
        if (p.unlocked === true) {
          if (p.typeratio === "vitesse") {
            this.product.vitesse /= p.ratio;
            this.openSnackBar(this.product.name + ' Speed x2 !', 'Fermer');
            console.log(p.unlocked+" 2");
          }
          if (p.typeratio === "gain") {
            this.product.revenu *= p.ratio;
            this.openSnackBar(this.product.name + ' Revenu x2 !', 'Fermer');
          }
        }
      }
    }
  } 

  tourUnlock(){
    for (let i=0;i<7;i++){
      this.calcUnlock(this.product.paliers[i]);
    }
  }


calcMaxCanBuy() {
let prix : number
let maxbuy : number


maxbuy = Math.floor(Math.log(1 - (this._wmoney/this.product.cout) * (1 - this.product.croissance)) / Math.log(this.product.croissance))
switch(this._qtmulti) {
  case '1':
    this.nbaffiche=1
     prix = 1*this.product.cout
     this.buymax = prix
    break;
  case '10':
    this.nbaffiche=10
    prix = this.product.cout*((Math.pow(this.product.croissance,10)-1)/(this.product.croissance - 1))
    this.buymax = prix
    break;
  case '100':
    this.nbaffiche=100
    prix =  prix = this.product.cout*((Math.pow(this.product.croissance,100)-1)/(this.product.croissance - 1))
    this.buymax = prix
    break;
  case 'Max':
    this.nbaffiche=Math.floor(maxbuy)
    prix =  prix = this.product.cout*((Math.pow(this.product.croissance,maxbuy)-1)/(this.product.croissance - 1))
    this.buymax = prix
    break;
  default:
}
}



}