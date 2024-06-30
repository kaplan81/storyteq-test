import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RoutedComponents } from '@vehicles/app/enums';
import { TitleMixin, emptyBase } from '@vehicles/app/mixins';
import { VehiclesService } from '@vehicles/cars/services/vehicles.service';

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
  #vehiclesService = inject(VehiclesService);

  /**
   * Test calls.
   */
  constructor() {
    super();
    this.#vehiclesService.getCars().subscribe(console.log);
    this.#vehiclesService.getCar('xe').subscribe(console.log);
  }
}
