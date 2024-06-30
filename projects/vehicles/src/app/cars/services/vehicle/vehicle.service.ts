import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '@vehicles/app/services/config/config.service';
import { Vehicle, VehicleDetail } from '@vehicles/cars/models';
import { Observable, delay, tap } from 'rxjs';
import { VehicleStateService } from '../vehicle-state/vehicle-state.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  static readonly apiSegment = 'api';
  static readonly delay = 1000;
  static readonly vehiclesSegment = 'vehicles';
  #baseUrl: string;
  #configService = inject(ConfigService);
  #http = inject(HttpClient);
  #vehicleStateService = inject(VehicleStateService);

  constructor() {
    this.#baseUrl = this.#configService.getApisConfig().vehicles.baseUrl;
  }

  getCar(carId: string): Observable<VehicleDetail> {
    const url = `${this.#getVehiclesApiUrl()}/${carId}`;
    return this.#http.get<VehicleDetail>(url).pipe(
      /**
       * Add a delay to make it more realistic and show the spinner.
       */
      delay(VehicleService.delay),
      tap((carDetail: VehicleDetail) =>
        this.#vehicleStateService.updateVehicleEntityDetail(carDetail),
      ),
    );
  }

  /**
   * We are creating this methos assuming that a future API
   * would allow us to distinguish between vehiches that
   * are cars and vehicles that are other type.
   */
  getCars(): Observable<Vehicle[]> {
    const url: string = this.#getVehiclesApiUrl();
    return this.#http.get<Vehicle[]>(url).pipe(
      /**
       * Add a delay to make it more realistic and show the spinner.
       */
      delay(VehicleService.delay),
      tap((cars: Vehicle[]) =>
        this.#vehicleStateService.updateState(this.#vehicleStateService.parseVehiclesToState(cars)),
      ),
    );
  }

  #getVehiclesApiUrl(): string {
    return `${this.#baseUrl}/${VehicleService.apiSegment}/${VehicleService.vehiclesSegment}`;
  }
}
