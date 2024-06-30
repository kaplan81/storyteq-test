import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@vehicles/app/app.config';
import { AppComponent } from '@vehicles/app/containers/app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
