import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";

export const appConfig: ApplicationConfig = {
    // The "provideHttpClient" function is the modern way of injecting the HttpClientModule
    providers: [provideHttpClient()]
}