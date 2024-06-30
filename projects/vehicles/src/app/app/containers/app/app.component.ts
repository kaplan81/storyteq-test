import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleMixin, emptyBase } from '@vehicles/app/mixins';
import { TitledComponent } from '@vehicles/app/models';
import { VehiclesService } from '@vehicles/cars/services/vehicles.service';

/**
 * Tell ngc about new properties.
 */
export interface AppComponent extends TitledComponent {}
@Component({
  selector: 'teq-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
})
export class AppComponent extends TitleMixin(emptyBase, 'Vehicles') {
  #vehiclesService = inject(VehiclesService);
}
