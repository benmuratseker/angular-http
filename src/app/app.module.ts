import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoffeeListComponent } from './components/coffee-list/coffee-list.component';
import { CoffeeApiService } from './services/coffee-api.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoffeeListComponent
  ],
  declarations: [
    AppComponent
  ],
  providers: [CoffeeApiService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
