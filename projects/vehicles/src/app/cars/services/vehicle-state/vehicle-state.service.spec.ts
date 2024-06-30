import { inject, TestBed } from '@angular/core/testing';
import {
  vehicleDetailMock,
  vehicleMock,
  vehicleStateMock,
  vehicleStateWithoutDetailMock,
} from '@vehicles/cars/test';
import { vehicleStateInitial } from './vehicle-state.initial';
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

  describe('getSortedVehicleEntities()', () => {
    it('should get entities in an array', () => {
      expect(vehicleStateService.getSortedVehicleEntities()()).toEqual([]);
      vehicleStateService.updateState(vehicleStateMock);
      expect(vehicleStateService.getSortedVehicleEntities()()).toEqual([
        {
          ...vehicleMock,
          detail: vehicleDetailMock,
        },
      ]);
    });
  });

  describe('parseVehiclesToState()', () => {
    it('should parse vehicle data to vehicle state', () => {
      expect(vehicleStateService.parseVehiclesToState([vehicleMock])).toEqual(
        vehicleStateWithoutDetailMock,
      );
    });
  });

  describe('removeVehicleEntity()', () => {
    it('should remove entity', () => {
      vehicleStateService.updateState(vehicleStateMock);
      vehicleStateService.removeVehicleEntity(vehicleMock.id);
      expect(vehicleStateService.state()).toEqual({
        entities: {},
        ids: [],
        loaded: false,
        loading: false,
      });
    });
  });

  describe('updateVehicleEntityDetail()', () => {
    it('should update the entity detail prop', () => {
      vehicleStateService.updateState(vehicleStateWithoutDetailMock);
      vehicleStateService.updateVehicleEntityDetail(vehicleDetailMock);
      expect(vehicleStateService.state()).toEqual({
        ...vehicleStateInitial,
        ids: [vehicleMock.id],
        entities: {
          [vehicleMock.id]: {
            ...vehicleMock,
            detail: vehicleDetailMock,
          },
        },
      });
    });
  });
});
