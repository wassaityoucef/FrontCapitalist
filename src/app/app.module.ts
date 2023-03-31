import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { BigvaluePipe } from './bigvalue.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { MyProgressBarComponent } from './myprogressbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MyProgressBarComponent,
    BigvaluePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
