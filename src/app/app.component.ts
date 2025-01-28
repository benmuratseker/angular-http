import { Component } from '@angular/core';
import { CoffeeListComponent } from './components/coffee-list/coffee-list.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, // Set this to false if you want to use the legacy way of bootstrapping an Angular application
  imports: [CoffeeListComponent], // Comment this out if you want to use the legacy way of bootstrapping an Angular application 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'coffee-palooza';
}
