import {gql} from "@urql/core";

export const GET_WORLD = gql`
query getWorld {
  getWorld {
    name
    logo
    money
    score
    totalangels
    activeangels
    angelbonus
    lastupdate
    products {
      id
      name
      logo
      cout
      croissance
      revenu
      vitesse
      quantite
      timeleft
      managerUnlocked
      paliers {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
    allunlocks {
      name
      logo
      seuil
      idcible
      ratio
      typeratio
      unlocked
    }
    upgrades {
      name
      logo
      seuil
      idcible
      ratio
      typeratio
      unlocked
    }
    angelupgrades {
      name
      logo
      seuil
      idcible
      ratio
      typeratio
      unlocked
    }
    managers {
      name
      logo
      seuil
      idcible
      ratio
      typeratio
      unlocked
    }
  }
}`;

export const LANCER_PRODUCTION = gql`
mutation Mutation($lancerProductionProduitId: Int!) {
  lancerProductionProduit(id: $lancerProductionProduitId) {
    name
    revenu
    vitesse
  }
}`;

 export const ACHETER_PRODUIT = gql`
 mutation Mutation($acheterQtProduitId: Int!, $quantite: Int!) {
  acheterQtProduit(id: $acheterQtProduitId, quantite: $quantite) {
    quantite
    name
  }
 }`; 

 export const ENGAGER_MANAGER = gql`
 mutation EngagerManager($name: String!) {
  engagerManager(name: $name) {
    name
  }
 }`;
 
