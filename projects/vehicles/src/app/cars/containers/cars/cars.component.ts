import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from '@vehicles/app/components';
import { RoutedComponents } from '@vehicles/app/enums';
import { TitleMixin, emptyBase } from '@vehicles/app/mixins';
import { VechicleState, VehicleEntity } from '@vehicles/cars/models';
import { VehicleStateService } from '@vehicles/cars/services/vehicle-state/vehicle-state.service';
import { VehicleService } from '@vehicles/cars/services/vehicle/vehicle.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, SpinnerComponent],
  standalone: true,
  styleUrl: './cars.component.scss',
  templateUrl: './cars.component.html',
})
export class CarsComponent extends TitleMixin(
  emptyBase,
  RoutedComponents[RoutedComponents.cars],
  true,
) {
  #vehicleService = inject(VehicleService);
  #vehicleStateService = inject(VehicleStateService);
  cars: Signal<VehicleEntity[]> = this.#vehicleStateService.getSortedVehicleEntities();
  vehicleState: Signal<VechicleState> = computed<VechicleState>(() =>
    this.#vehicleStateService.state(),
  );

  /**
   * Test calls.
   */
  constructor() {
    super();
    this.#vehicleService.getCars().pipe(takeUntilDestroyed()).subscribe();
  }
}
