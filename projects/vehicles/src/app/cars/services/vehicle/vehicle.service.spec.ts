import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { VehicleDetail } from '@vehicles/cars/models';
import { vehicleDetailMock } from '@vehicles/cars/test';
import { of } from 'rxjs';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let vehicleService: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    vehicleService = TestBed.inject(VehicleService);
    vehicleService.getCars = jest.fn(() => of([vehicleDetailMock]));
  });

  it('can be instantiated via DI', inject([VehicleService], (injectedService: VehicleService) => {
    expect(injectedService).toBe(vehicleService);
  }));

  describe('getCars()', () => {
    it('fetches cars', (done: jest.DoneCallback) => {
      vehicleService.getCars().subscribe((vehicleDetails: (VehicleDetail | null)[]) => {
        expect(vehicleDetails).toEqual([vehicleDetailMock]);
        done();
      });
    });
  });
});
