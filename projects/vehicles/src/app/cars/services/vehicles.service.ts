import { Injectable, inject } from '@angular/core';
import { ConfigService } from '@vehicles/app/services/config/config.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  static readonly apiSegment = 'api';
  static readonly vehiclesSegment = 'vehicles';
  #configService = inject(ConfigService);
  #baseUrl = this.#configService.getApisConfig().vehicles.baseUrl;

  getCar(carId: string): Observable<any> {
    const url = `${this.#getVehiclesApiUrl()}/${carId}`;
    return of({});
  }

  /**
   * We are creating this methos assuming that a future API
   * would allow us to distinguish between vehiches that
   * are cars and vehicles that are other type.
   */
  getCars(): Observable<any> {
    const url = this.#getVehiclesApiUrl();
    return of();
  }

  #getVehiclesApiUrl(): string {
    return `${this.#baseUrl}/${VehiclesService.apiSegment}/${
      VehiclesService.vehiclesSegment
    }`;
  }
}
