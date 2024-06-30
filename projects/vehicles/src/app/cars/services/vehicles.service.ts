import { Injectable, inject } from '@angular/core';
import { ConfigService } from '@vehicles/app/services/config/config.service';

// https://frontend-code-test-api-jhbwml7vva-nw.a.run.app/api/vehicles/{id}

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  static readonly apiSegment = 'api';
  static readonly vehiclesSegment = 'vehicles';
  #configService = inject(ConfigService);
  #baseUrl = this.#configService.getApisConfig().vehicles.baseUrl;
}
