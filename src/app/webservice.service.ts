import { Injectable } from '@angular/core';
import { createClient } from '@urql/core';
import { ACHETER_PRODUIT, ENGAGER_MANAGER, GET_WORLD,LANCER_PRODUCTION } from './graphqlrequest';
import { Palier, Product } from './world';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  server = 'http://localhost:4000';
  user = '';

  constructor() { }

  createClient() {
  return createClient({
    url: this.server + "/graphql",
    fetchOptions: () => ({
      method: 'POST',
      headers: { 'x-user': this.user },
    }),
  });
}

getWorld() {
  return this.createClient().query(GET_WORLD, {}).toPromise();
 }

 updateUser(username: string) {
  this.user = username;
  console.log(this.user+" x user")
}

lancerProduction(product: Product) {
  return this.createClient().mutation(LANCER_PRODUCTION, { lancerProductionProduitId:
 product.id}).toPromise();
 }

 engagerManager(manager: Palier) {
  return this.createClient().mutation(ENGAGER_MANAGER, { name: manager.name }).toPromise();
}

acheterProduit(produitId: number, quantite: number) {
  return this.createClient().mutation(ACHETER_PRODUIT, { acheterQtProduitId: produitId, quantite }).toPromise();
}

 
   
}
