import { Injectable } from '@angular/core';
import { VehicleDetail } from '@vehicles/cars/models';
import { VehicleService } from '@vehicles/cars/services/vehicle/vehicle.service';
import { Observable, of } from 'rxjs';
import { vehicleDetailMock } from './vehicle.mock';

@Injectable({
  providedIn: 'root',
})
export class VehicleServiceMock extends VehicleService {
  override getCars: jest.Mock<Observable<(VehicleDetail | null)[]>> = jest.fn(() =>
    of([vehicleDetailMock]),
  );
}
