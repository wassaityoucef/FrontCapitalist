import { Component } from '@angular/core';
import { WebserviceService } from './webservice.service';
import { Palier, World } from './world';
import { Product } from './world';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  server: string = 'http://localhost:4000';
  qtmulti='1';
  ShowManagers = false;
  username = '';
  ShowUnlocks = false;
  world: World = new World();

  constructor(
    protected service: WebserviceService,
    private snackBar: MatSnackBar
  ) {
    
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
  

onUsernameChanged(service : WebserviceService) {
  localStorage.setItem("username", this.username);
  this.service.updateUser(this.username);
  console.log(this.username);

  setTimeout(() => {
    location.reload(); // Rafraîchissement automatique de la page
  }, 500); // Délai de 0,5 seconde avant le rafraîchissement
}



ngOnInit() {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    this.username = storedUsername;
  } else {
    const randomNum = Math.floor(Math.random() * 10000);
    this.username = "Knight" + randomNum;
    localStorage.setItem("username", this.username);
  }
  this.service.updateUser(this.username);
  this.service.getWorld().then(
    world => {
    this.world = world.data.getWorld;
    });
}

wmoney=this.world.money;

onProductionDone(p: Product){
  this.world.money += p.revenu;
}

onBuyDone(prix: number){
  this.world.money -= prix;
}

qtswap(){
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

hiremanager(manager : Palier){
  
  if (this.world.money >= manager.seuil){
  this.world.money -= manager.seuil;
  manager.unlocked=true;
  this.world.products[manager.idcible-1].managerUnlocked = true;
  this.service.engagerManager(manager)
    .catch(reason => console.log("erreur: " + reason));
    this.openSnackBar('Vous avez engagé '+manager.name+' pour éliminer des ' +this.world.products[manager.idcible-1].name, 'Fermer');
} 

}





  title = 'Hallownest Capitalist';
  
}