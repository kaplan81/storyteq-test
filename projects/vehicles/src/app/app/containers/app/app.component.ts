import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleMixin, emptyBase } from '@vehicles/app/mixins';
import { TitledComponent } from '@vehicles/app/models';
import { VehicleService } from '@vehicles/cars/services/vehicle/vehicle.service';

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
  #vehiclesService = inject(VehicleService);
}
