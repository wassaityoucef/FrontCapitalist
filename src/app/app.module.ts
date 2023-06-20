import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { BigvaluePipe } from './bigvalue.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { MyProgressBarComponent } from './myprogressbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { WebserviceService } from './webservice.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MyProgressBarComponent,
    BigvaluePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatBadgeModule,
    FormsModule,
  ],
  providers: [
    WebserviceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
