import { Component } from '@angular/core';
import { WebserviceService } from './webservice.service';
import { World } from './world';
import { Product } from './world';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  server: string = 'http://localhost:4000';
  qtmulti='1';
  

  world: World = new World();
constructor(private service: WebserviceService) {
 service.getWorld().then(
 world => {
 this.world = world.data.getWorld;
 });
}

wmoney=this.world.money;

onProductionDone(p: Product){
  this.world.money += p.revenu;
}

qtswap(){
  console.log("wsh")
  console.log(this.qtmulti)
  switch(this.qtmulti) {
    case '1':
      this.qtmulti = '10';
      break;
    case '10':
      this.qtmulti = '100';
      break;
    case '100':
      this.qtmulti = 'Max';
      break;
    case 'Max':
      this.qtmulti = '1';
      break;
    default:
  }
  
}


  title = 'Hallownest Capitalist';
  
}