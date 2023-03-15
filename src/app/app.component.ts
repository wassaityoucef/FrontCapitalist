import { Component } from '@angular/core';
import { WebserviceService } from './webservice.service';
import { World } from './world';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  server: string = 'http://localhost:4000';

  world: World = new World();
constructor(private service: WebserviceService) {
 service.getWorld().then(
 world => {
 this.world = world.data.getWorld;
 });
}

  title = 'FrontCapitalist';
  
}