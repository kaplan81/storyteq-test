import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoutedComponents } from '@vehicles/app/enums';
import { TitleMixin, emptyBase } from '@vehicles/app/mixins';
import { VehicleEntity } from '@vehicles/cars/models';
import { VehicleStateService } from '@vehicles/cars/services/vehicle-state/vehicle-state.service';
import { VehicleService } from '@vehicles/cars/services/vehicle/vehicle.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  standalone: true,
  styleUrl: './cars.component.scss',
  templateUrl: './cars.component.html',
})
export class CarsComponent extends TitleMixin(
  emptyBase,
  RoutedComponents[RoutedComponents.cars],
  true
) {
  #vehicleService = inject(VehicleService);
  #vehicleStateService = inject(VehicleStateService);
  cars: Signal<VehicleEntity[]> =
    this.#vehicleStateService.getSortedVehicleEntities();

  /**
   * Test calls.
   */
  constructor() {
    super();
    this.#vehicleService.getCars().pipe(takeUntilDestroyed()).subscribe();
  }
}
