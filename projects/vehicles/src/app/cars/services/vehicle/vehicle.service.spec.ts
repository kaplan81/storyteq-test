import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let vehicleService: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    vehicleService = TestBed.inject(VehicleService);
  });

  it('can be instantiated via DI', inject([VehicleService], (injectedService: VehicleService) => {
    expect(injectedService).toBe(vehicleService);
  }));
});
