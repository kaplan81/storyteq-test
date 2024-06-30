import { inject, TestBed } from '@angular/core/testing';
import { VehicleStateService } from './vehicle-state.service';

describe('VehicleService', () => {
  let vehicleStateService: VehicleStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    vehicleStateService = TestBed.inject(VehicleStateService);
  });

  it('can be instantiated via DI', inject(
    [VehicleStateService],
    (injectedService: VehicleStateService) => {
      expect(injectedService).toBe(vehicleStateService);
    },
  ));
});
