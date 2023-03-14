import { Component } from '@angular/core';
import { WebserviceService } from './webservice.service';
import { World } from './world';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // world: World = new World();
  // constructor(private service: WebserviceService) {


  // }

  title = 'FrontCapitalist';
  ngOnInit() {
    
    // this.service.getWorld().then(
    //   world => {
    //   this.world = world.data.getWorld;
    //   console.log("oklm")});
    // }  

  }
}