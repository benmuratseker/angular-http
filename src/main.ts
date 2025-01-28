import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// The modern way of bootstrapping an Angular application with an HTTP Client (via ApplicationConfig and provideHttpClient)
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// The following code constitutes the legacy means of bootstrapping your application with an HTTP client by way of the root AppModule
// Note that for this to work, you will need to ensure that the AppComponent is no longer a "standalone" component
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

// platformBrowserDynamic().bootstrapModule(AppModule)
// .catch(err => console.error(err));
