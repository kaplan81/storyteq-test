import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RoutedComponents } from '@vehicles/app/enums';
import { TitleMixin, emptyBase } from '@vehicles/app/mixins';
import { VehicleService } from '@vehicles/cars/services/vehicle/vehicle.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  standalone: true,
  styleUrl: './cars.component.scss',
  templateUrl: './cars.component.html',
})
export class CarsComponent extends TitleMixin(
  emptyBase,
  RoutedComponents[RoutedComponents.cars].toUpperCase(),
  true
) {
  #vehiclesService = inject(VehicleService);

  /**
   * Test calls.
   */
  constructor() {
    super();
    this.#vehiclesService.getCars().subscribe();
  }
}
