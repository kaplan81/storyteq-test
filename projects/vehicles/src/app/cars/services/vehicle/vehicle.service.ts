import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '@vehicles/app/services/config/config.service';
import { Vehicle, VehicleDetail } from '@vehicles/cars/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  static readonly apiSegment = 'api';
  static readonly vehiclesSegment = 'vehicles';
  #configService = inject(ConfigService);
  #baseUrl = this.#configService.getApisConfig().vehicles.baseUrl;
  #http = inject(HttpClient);

  getCar(carId: string): Observable<VehicleDetail> {
    const url = `${this.#getVehiclesApiUrl()}/${carId}`;
    return this.#http.get<VehicleDetail>(url);
  }

  /**
   * We are creating this methos assuming that a future API
   * would allow us to distinguish between vehiches that
   * are cars and vehicles that are other type.
   */
  getCars(): Observable<Vehicle[]> {
    const url: string = this.#getVehiclesApiUrl();
    return this.#http.get<Vehicle[]>(url);
  }

  #getVehiclesApiUrl(): string {
    return `${this.#baseUrl}/${VehicleService.apiSegment}/${
      VehicleService.vehiclesSegment
    }`;
  }
}
