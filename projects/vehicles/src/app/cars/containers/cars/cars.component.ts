import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from '@vehicles/app/components';
import { Breakpoint, RoutedComponents } from '@vehicles/app/enums';
import { TitleMixin, emptyBase } from '@vehicles/app/mixins';
import { MediaAspectRatio } from '@vehicles/cars/enums';
import { VechicleState, VehicleEntity } from '@vehicles/cars/models';
import { VehicleStateService } from '@vehicles/cars/services/vehicle-state/vehicle-state.service';
import { VehicleService } from '@vehicles/cars/services/vehicle/vehicle.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpinnerComponent],
  standalone: true,
  styleUrl: './cars.component.scss',
  templateUrl: './cars.component.html',
})
export class CarsComponent extends TitleMixin(
  emptyBase,
  RoutedComponents[RoutedComponents.cars],
  true,
) {
  #breakpointObserver = inject(BreakpointObserver);
  #vehicleService = inject(VehicleService);
  #vehicleStateService = inject(VehicleStateService);
  cars: Signal<VehicleEntity[]> = this.#vehicleStateService.getSortedVehicleEntities();
  vehicleState: Signal<VechicleState> = computed<VechicleState>(() =>
    this.#vehicleStateService.state(),
  );
  mediaApectRatio: WritableSignal<MediaAspectRatio> = signal<MediaAspectRatio>(
    MediaAspectRatio.mobile,
  );

  constructor() {
    super();
    this.#breakpointObserver
      .observe([`(min-width: ${Breakpoint.md})`])
      .pipe(takeUntilDestroyed())
      .subscribe((breakpointState: BreakpointState) => {
        if (breakpointState.matches) {
          console.log(`Viewport width is ${Breakpoint.md} or greater!`);
          this.mediaApectRatio.set(MediaAspectRatio.nonMobile);
        } else {
          console.log(`Viewport width is less than ${Breakpoint.md}!`);
          this.mediaApectRatio.set(MediaAspectRatio.mobile);
        }
      });
    this.#vehicleService.getCars().pipe(takeUntilDestroyed()).subscribe();
  }

  getPrice(car: VehicleEntity): string {
    let price = '';
    if (car.detail !== null) {
      if (car.detail.price !== undefined) {
        price = car.detail.price;
      }
    }
    return price.length > 0 ? `From ${price}` : 'No price available';
  }
}
