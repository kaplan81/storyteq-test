import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '@vehicles/app/services/config/config.service';
import { Vehicle, VehicleDetail } from '@vehicles/cars/models';
import { Observable, catchError, forkJoin, of, switchMap, tap } from 'rxjs';
import { VehicleError } from '../../models/vehicle.model';
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

  /**
   * We are creating this method assuming that a future API
   * would allow us to distinguish between vehiches that
   * are cars and vehicles that are other type.
   */
  getCars(): Observable<(VehicleDetail | null)[]> {
    const url: string = this.#getVehiclesApiUrl();
    this.#vehicleStateService.updateStateProp('loading', true);
    return this.#http.get<Vehicle[]>(url).pipe(
      switchMap((cars: Vehicle[]) => {
        this.#vehicleStateService.updateState(this.#vehicleStateService.parseVehiclesToState(cars));
        const getCarCalls$: Observable<VehicleDetail | null>[] = this.#vehicleStateService
          .state()
          .ids.map((carId: string | number) => this.#getCar(carId));
        return forkJoin(getCarCalls$).pipe(
          tap(() => {
            this.#vehicleStateService.updateStateProp('loading', false);
            this.#vehicleStateService.updateStateProp('loaded', true);
          }),
        );
      }),
    );
  }

  #getCar(carId: string | number): Observable<VehicleDetail | null> {
    const url = `${this.#getVehiclesApiUrl()}/${carId}`;
    return this.#http.get<VehicleDetail>(url).pipe(
      tap((carDetail: VehicleDetail) =>
        this.#vehicleStateService.updateVehicleEntityDetail(carDetail),
      ),
      catchError((error: VehicleError) => {
        const url = new URL(error.url);
        const segments = url.pathname.split('/');
        const problematicCarId: string | undefined = segments.at(-1) ?? '';
        this.#vehicleStateService.removeVehicleEntity(problematicCarId);
        console.warn(
          `Car/Vehicle with ID "${problematicCarId}" not found in backend, so we skip it.`,
        );
        return of(null);
      }),
    );
  }

  #getVehiclesApiUrl(): string {
    return `${this.#baseUrl}/${VehicleService.apiSegment}/${VehicleService.vehiclesSegment}`;
  }
}
