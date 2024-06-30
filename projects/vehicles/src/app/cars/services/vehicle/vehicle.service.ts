import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EntityState } from '@vehicles/app/models';
import { ConfigService } from '@vehicles/app/services/config/config.service';
import {
  VechicleState,
  Vehicle,
  VehicleDetail,
  VehicleEntity,
} from '@vehicles/cars/models';
import { Observable, tap } from 'rxjs';
import { VehicleStateService } from '../vehicle-state/vehicle-state.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  static readonly apiSegment = 'api';
  static readonly vehiclesSegment = 'vehicles';
  #configService = inject(ConfigService);
  #baseUrl = this.#configService.getApisConfig().vehicles.baseUrl;
  #http = inject(HttpClient);
  #vehicleStateService = inject(VehicleStateService);

  getCar(carId: string): Observable<VehicleDetail> {
    const url = `${this.#getVehiclesApiUrl()}/${carId}`;
    return this.#http
      .get<VehicleDetail>(url)
      .pipe(tap((carDetail: VehicleDetail) => console.log(carDetail)));
  }

  /**
   * We are creating this methos assuming that a future API
   * would allow us to distinguish between vehiches that
   * are cars and vehicles that are other type.
   */
  getCars(): Observable<Vehicle[]> {
    const url: string = this.#getVehiclesApiUrl();
    return this.#http
      .get<Vehicle[]>(url)
      .pipe(
        tap((cars: Vehicle[]) =>
          this.#vehicleStateService.updateState(
            this.#parseVehiclesToState(cars)
          )
        )
      );
  }

  #getVehiclesApiUrl(): string {
    return `${this.#baseUrl}/${VehicleService.apiSegment}/${
      VehicleService.vehiclesSegment
    }`;
  }

  #parseVehiclesToState(cars: Vehicle[]): VechicleState {
    return cars.reduce(
      (acc: EntityState<VehicleEntity>, car: Vehicle) => {
        return {
          ids: [...acc.ids, car.id],
          entities: {
            ...acc.entities,
            [car.id]: { ...car, detail: null },
          },
        };
      },
      {
        ids: [],
        entities: {},
      } as EntityState<VehicleEntity>
    );
  }
}
